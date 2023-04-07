import checkauth from "../../middleware/auth/authanticatoin";
import { Request, Response, Application } from "express";
import { Error } from "../../utlities/error_response";
import ToDoModel, { Status } from "../../model/collectionsModel";
import checkTaskExist from "../../middleware/chekTaskExist.ts/checkTaskExist";
import { UserModel } from "../../model/userModel";
import { TaskDto } from "./dto/insertTask.dto";
import { validate } from "class-validator";
import { UpdateTaskDto } from "./dto/updateTask.dto";

const error = new Error();

const insertTask = async (req: Request, res: Response) => {
  try {
    const body: TaskDto = req.body;

    const insertTaskDto = new TaskDto();
    insertTaskDto._id = body._id;
    insertTaskDto.emailAfterAuth = body.emailAfterAuth;
    insertTaskDto.status = body.status;
    insertTaskDto.title = body.title;
    insertTaskDto.description = body.description;
    insertTaskDto.priority = body.priority;

    const errors = await validate(insertTaskDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        input: errors[0].property,
        response_msg: Object.values(errors[0].constraints as any)[0],
      });
    }

    const { _id, emailAfterAuth, status, title, description, priority } =
      insertTaskDto;

    const newTask = new ToDoModel({
      _id,
      email: emailAfterAuth,
      status,
      title,
      description,
      priority,
    });

    await newTask
      .save()
      .then(() => res.status(200).json({ error: false }))
      .catch(() => res.status(500).json({ error: error.error_500 }));
  } catch (e) {
    console.log("Error from Insert Document function.");
    res.status(500).send(error.error_500);
  }
};

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { emailAfterAuth } = req.body;

    const resultFromDB = await UserModel.aggregate([
      {
        $match: { _id: emailAfterAuth },
      },
      {
        $lookup: {
          from: "todos",
          localField: "_id",
          foreignField: "email",
          as: "allData",
        },
      },
      {
        $project: {
          _id: 0,
          collections: {
            TODO: {
              $filter: {
                input: "$allData",
                as: "item",
                cond: {
                  $eq: ["$$item.status", Status.TODO],
                },
              },
            },
            INprogress: {
              $filter: {
                input: "$allData",
                as: "item",
                cond: {
                  $eq: ["$$item.status", Status.INprogress],
                },
              },
            },
            UnderReview: {
              $filter: {
                input: "$allData",
                as: "item",
                cond: {
                  $eq: ["$$item.status", Status.UnderReview],
                },
              },
            },
            Rework: {
              $filter: {
                input: "$allData",
                as: "item",
                cond: {
                  $eq: ["$$item.status", Status.Rework],
                },
              },
            },
            Completed: {
              $filter: {
                input: "$allData",
                as: "item",
                cond: {
                  $eq: ["$$item.status", Status.Completed],
                },
              },
            },
          },
        },
      },
    ]);

    res.status(200).json({ error: false, data: resultFromDB });
  } catch (e) {
    console.log("Error from Get All Tasks function.");
    res.status(500).send(error.error_500);
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const body: UpdateTaskDto = req.body;

    const insertTaskDto = new UpdateTaskDto();
    insertTaskDto._id = body._id;
    insertTaskDto.emailAfterAuth = body.emailAfterAuth;
    insertTaskDto.status = body.status;
    insertTaskDto.title = body.title;
    insertTaskDto.description = body.description;
    insertTaskDto.priority = body.priority;

    const errors = await validate(insertTaskDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        input: errors[0].property,
        response_msg: Object.values(errors[0].constraints as any)[0],
      });
    }

    const { _id, emailAfterAuth, status, title, description, priority } =
      insertTaskDto;

    const dbResult = await ToDoModel.updateOne(
      { _id, email: emailAfterAuth },
      { $set: { title, description, priority, status } }
    );
    res.status(200).json(dbResult);
  } catch (e) {
    console.log("Error from Update Task function.");
    res.status(500).send(error.error_500);
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { _id, emailAfterAuth } = req.body;
    await ToDoModel.deleteOne({ _id, email: emailAfterAuth }).then((result) => {
      res.status(200).send(result);
    });
  } catch (e) {
    console.log("Error from Delete Task function.");
    res.status(500).send(error.error_500);
  }
};

const collectionsEndpoint = (app: Application) => {
  app.post("/api/collecions/inserttask", checkauth, checkTaskExist, insertTask);
  app.get("/api/collecions/gettasks", checkauth, getAllTasks);
  app.put("/api/collecions/updatetask", checkauth, updateTask);
  app.delete("/api/collecions/delete", checkauth, deleteTask);
};

export default collectionsEndpoint;
