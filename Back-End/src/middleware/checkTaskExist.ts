import { Request, Response, NextFunction } from "express";
import { collectionsModel } from "../model/collectionsModel";
import { Error } from "../utlities/error_response";

const error = new Error();

const checkTaskExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.body;
  try {
    await collectionsModel.findOne({ _id }, { _id: 1 }).then((response) => {
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
