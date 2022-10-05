import checkauth from "../middleware/authanticatoin";
import { Request, Response, Application, response } from "express";
import { Error } from "../utlities/error_response";
import { collectionsModel } from "../model/collectionsModel";
import checkTaskExist from "../middleware/checkTaskExist";
import { userModel } from "../model/userModel";

const error = new Error();

const insertTask = async (req: Request, res: Response) => {
  try {
    const { _id, emailAfterAuth, status, title, description, priority } =
      req.body;

    if (
      _id !== undefined &&
      status !== undefined &&
      title !== undefined &&
      description !== undefined &&
      priority !== undefined
    ) {
      const newTask = new collectionsModel({
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
    } else {
      res.status(400).json({ error: error.error_400 });
    }
  } catch (e) {
    console.log("Error from Insert Document function.");
    res.status(500).send(error.error_500);
  }
};

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { emailAfterAuth } = req.body;

    const resultFromDB = await userModel.aggregate([
      {
        $lookup: {
          from: "collections",
          localField: "_id",
          foreignField: "email",
          pipeline: [{ $match: { status: "TODO" } }, { $project: { __v: 0 } }],
          as: "collections.TODO",
        },
      },
      {
        $lookup: {
          from: "collections",
          localField: "_id",
          foreignField: "email",
          pipeline: [
            { $match: { status: "INprogress" } },
            { $project: { __v: 0 } },
          ],
          as: "collections.INprogress",
        },
      },
      {
        $lookup: {
          from: "collections",
          localField: "_id",
          foreignField: "email",
          pipeline: [
            { $match: { status: "UnderReview" } },
            { $project: { __v: 0 } },
          ],
          as: "collections.UnderReview",
        },
      },
      {
        $lookup: {
          from: "collections",
          localField: "_id",
          foreignField: "email",
          pipeline: [
            { $match: { status: "Rework" } },
            { $project: { __v: 0 } },
          ],
          as: "collections.Rework",
        },
      },
      {
        $lookup: {
          from: "collections",
          localField: "_id",
          foreignField: "email",
          pipeline: [
            { $match: { status: "Completed" } },
            { $project: { __v: 0 } },
          ],
          as: "collections.Completed",
        },
      },
      { $match: { _id: emailAfterAuth } },
      { $project: { collections: 1, _id: 0 } },
    ]);

    res.status(200).json({ error: false, data: resultFromDB });
  } catch (e) {
    console.log("Error from Get All Tasks function.");
    res.status(500).send(error.error_500);
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { _id, title, description, priority, status, emailAfterAuth } =
      req.body;
    const dbResult = await collectionsModel.updateOne(
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
    await collectionsModel
      .deleteOne({ _id, email: emailAfterAuth })
      .then((result) => {
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
