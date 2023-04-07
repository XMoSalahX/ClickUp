import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../model/userModel";
import { Error } from "../../utlities/error_response";
import { CheckUserExistDto } from "./dto/checkUserExist.dto";
import { validate } from "class-validator";

const error = new Error();

const checkUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkUserExistDto = new CheckUserExistDto();

    checkUserExistDto.email = req.body.email;

    const errors = await validate(checkUserExistDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        input: errors[0].property,
        response_msg: Object.values(errors[0].constraints as any)[0],
      });
    }

    const { email } = checkUserExistDto;

    await UserModel.findOne(
      { _id: email },
      { status: 1, verification: 1 }
    ).then((response) => {
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
