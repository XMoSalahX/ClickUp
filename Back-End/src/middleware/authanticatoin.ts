import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Error } from "../utlities/error_response";
import { config } from "../config";

const error = new Error();

const checkauth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization !== undefined) {
      const decodeToken = jwt.verify(
        req.headers.authorization.split(" ")[1],
        config.server.jwt as string
      );
      const tokenParser = decodeToken as JwtPayload;
      const userEmail = tokenParser.user._id;
      req.body.emailAfterAuth = userEmail;
    }
    next();
  } catch (err) {
    console.log("Token Expired.");
    res.status(401).send(error.error_401);
  }
};

export default checkauth;
