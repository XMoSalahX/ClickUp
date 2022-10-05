import { Request, Response, NextFunction } from "express";
import { userModel } from "../model/userModel";
import { Error } from "../utlities/error_response";

const error = new Error();

const checkUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    await userModel
      .findOne({ _id: email }, { status: 1, verification: 1 })
      .then((response) => {
        if (response === null) {
          next();
        } else {
          if (response.status === "Pending") {
            req.body.currentStatus = response.status;
            req.body.currentVerification = response.verification;
            next();
          } else {
            res.status(409).json(error.error_409);
          }
        }
      });
  } catch (err) {
    console.log("Error when checking user is exist");
    res.status(500).json(error.error_500);
  }
};

export default checkUserExist;
