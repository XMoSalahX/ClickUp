import { Request, Response, NextFunction } from "express";
import ToDoModel from "../../model/collectionsModel";
import { Error } from "../../utlities/error_response";
import { CheckTaskExistDto } from "./dto/checkTaskExist.dto";
import { validate } from "class-validator";

const error = new Error();

const checkTaskExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkTaskExistDto = new CheckTaskExistDto();

    checkTaskExistDto._id = req.body._id;

    const errors = await validate(checkTaskExistDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        input: errors[0].property,
        response_msg: Object.values(errors[0].constraints as any)[0],
      });
    }

    const { _id } = checkTaskExistDto;

    await ToDoModel.findOne({ _id }, { _id: 1 }).then((response) => {
      if (response === null) {
        next();
      } else {
        res.status(409).json(error.error_409);
      }
    });
  } catch (err) {
    console.log("Error when checking task is exist");
    res.status(500).json(error.error_500);
  }
};

export default checkTaskExist;
