import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Error } from "../../utlities/error_response";
import { config } from "../../config";
import { AuthanticationDto } from "./dto/authanticaion.dto";
import { validate } from "class-validator";

const error = new Error();

const checkauth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authanticationDto = new AuthanticationDto();

    authanticationDto.authorization = (
      req.headers.authorization as string
    ).split(" ")[1] as string;

    const errors = await validate(authanticationDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        input: errors[0].property,
        response_msg: Object.values(errors[0].constraints as any)[0],
      });
    }

    const { authorization } = authanticationDto;

    const decodeToken = jwt.verify(authorization, config.server.jwt as string);
    const tokenParser = decodeToken as JwtPayload;
    const userEmail = tokenParser.user._id;
    req.body.emailAfterAuth = userEmail;

    next();
  } catch (err) {
    console.log("Token Expired.");
    res.status(401).send(error.error_401);
  }
};

export default checkauth;
