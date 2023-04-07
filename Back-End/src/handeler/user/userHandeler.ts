import { UserModel } from "../../model/userModel";
import { Request, Response, Application } from "express";
import { Error } from "../../utlities/error_response";
import checkUserExist from "../../middleware/checkUserExist/checkUserExist";
import mailHaneler from "../../utlities/mail controler";
import { hashSync, compareSync } from "bcrypt";
import { config } from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserDto } from "./dto/user.dto";
import { validate } from "class-validator";
import { VerificationCodeDto } from "./dto/verificationCode.dto";
import { AuthDto } from "./dto/auth.dto";
import { AccessTokenRquestDto } from "./dto/accessTokenRequest.dto";
import { ChangPasswordDto } from "./dto/changPassword.dto";

const error = new Error();

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const body: UserDto = req.body;

    const userDto = new UserDto();
    userDto.email = body.email;
    userDto.password = body.password;
    userDto.name = body.name;
    userDto.currentStatus = body.currentStatus;
    userDto.currentVerification = body.currentVerification;

    const errors = await validate(userDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        input: errors[0].property,
        response_msg: Object.values(errors[0].constraints as any)[0],
      });
    }

    const {
      lowerCaseEmail,
      password,
      name,
      currentVerification,
      currentStatus,
    } = userDto;

    const email = lowerCaseEmail;

    let ver = Math.floor(Math.random() * (9999 - 999) + 999);

    if (currentStatus === "Pending") {
      ver = currentVerification;
      await mailHaneler("ClickUp Verification Message", email, ver);
      res.status(200).json({ error: false });
    } else {
      const mailRes = await mailHaneler(
        "ClickUp Verification Message",
        email,
        ver
      );

      const hash = hashSync(
        password + config.server.hash,
        parseInt(config.server.salt as string)
      );

      const user = new UserModel({
        _id: email,
        name,
        email,
        password: hash,
        status: "Pending",
        verification: ver,
      });

      if (mailRes) {
        await user
          .save()
          .then(() => {
            res.status(200).json({ error: false });
          })
          .catch(() => {
            res.status(409).json(error.email);
          });
      } else {
        res.status(409).json(error.email);
      }
    }
  } catch (e) {
    console.log("Error creating user");
    res.status(500).json(error.error_500);
  }
};

// Verification user account
const verification = async (req: Request, res: Response) => {
  try {
    const body: VerificationCodeDto = req.body;

    const verificationDto = new VerificationCodeDto();

    verificationDto.email = body.email;
    verificationDto.verificationCode = body.verificationCode as number;

    const errors = await validate(verificationDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        input: errors[0].property,
        response_msg: Object.values(errors[0].constraints as any)[0],
      });
    }

    const { lowerCaseEmail, verificationCode } = verificationDto;

    const email = lowerCaseEmail;

    const result = await UserModel.updateOne(
      {
        _id: email,
        verification: verificationCode,
      },
      { $set: { status: "Active" } }
    );

    if (result.matchedCount === 0) {
      res.status(404).json(error.error_404);
    } else {
      res.status(200).json({ error: false });
    }
  } catch (e) {
    console.log("Error from verification Function.");
    res.status(500).json(error.error_500);
  }
};

// User Login to account
const auth = async (req: Request, res: Response) => {
  try {
    const body: AuthDto = req.body;

    const authDto = new AuthDto();

    authDto.email = body.email;
    authDto.password = body.password;

    const errors = await validate(authDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        input: errors[0].property,
        response_msg: Object.values(errors[0].constraints as any)[0],
      });
    }
    const { lowerCaseEmail, password } = authDto;

    const email = lowerCaseEmail;

    const user = await UserModel.findOne(
      { _id: email, status: "Active" },
      {
        _id: 1,
        password: 1,
      }
    );

    if (user !== null) {
      const userAuth = compareSync(
        password + config.server.hash,
        user.password
      );

      if (userAuth) {
        const token = jwt.sign({ user }, config.server.jwt as string, {
          expiresIn: "1h",
        });

        res.status(200).json({ error: false, token: token });
      } else {
        res.status(401).json(error.error_401);
      }
    } else {
      res.status(404).json(error.error_404);
    }
  } catch (e) {
    console.log("Error from login function.");
    res.status(500).send(error.error_500);
  }
};

// Send access token request
const accessTokenRequest = async (req: Request, res: Response) => {
  const body: AccessTokenRquestDto = req.body;

  const accessTokenRequest = new AccessTokenRquestDto();

  accessTokenRequest.email = body.email;

  const errors = await validate(accessTokenRequest);
  if (errors.length > 0) {
    return res.status(400).json({
      error: true,
      input: errors[0].property,
      response_msg: Object.values(errors[0].constraints as any)[0],
    });
  }

  const { lowerCaseEmail } = accessTokenRequest;

  const email = lowerCaseEmail;

  try {
    const user = await UserModel.findOne(
      { _id: email },
      { _id: 1, password: 1 }
    );

    if (user !== null) {
      const token = jwt.sign({ user }, config.server.jwt as string, {
        expiresIn: "1h",
      });
      const mailIsVaild = await mailHaneler(
        "Reset your ClickUp password",
        email,
        "Reset Password",
        `${config.front.url}/auth/reset?token=${token}`,
        "It's okay! This happens to the best of us."
      );
      if (mailIsVaild) {
        res.status(200).send({ error: false });
      } else {
        res.status(404).send(error.error_404);
      }
    } else {
      res.status(404).send(error.error_404);
    }
  } catch (e) {
    console.log("Error from get Access token function.");
    res.status(500).send(error.error_500);
  }
};

// change password
const changePassword = async (req: Request, res: Response) => {
  try {
    const body: ChangPasswordDto = req.body;

    const changPasswordDto = new ChangPasswordDto();

    changPasswordDto.password = body.password;
    changPasswordDto.authraization = (
      req.headers?.authraization as string
    ).split(" ")[1] as string;
    const errors = await validate(changPasswordDto);
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        input: errors[0].property,
        response_msg: Object.values(errors[0].constraints as any)[0],
      });
    }

    let { password, authraization } = changPasswordDto;

    try {
      const userToken = jwt.verify(authraization, config.server.jwt as string);
      const email = (userToken as JwtPayload).user._id;
      password = hashSync(
        password + config.server.hash,
        parseInt(config.server.salt as string)
      );
      await UserModel.updateOne({ _id: email }, { $set: { password } });

      res.status(200).json({ error: false });
    } catch (e) {
      res.status(401).json(error.error_401);
    }
  } catch (e) {
    console.log("Error from changePassword function.");
    res.status(500).send(error.error_500);
  }
};

const checkauth = async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization !== undefined) {
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        config.server.jwt as string
      );
    }
    res.status(200).json({ error: false });
  } catch (err) {
    console.log("Token Expired.");
    res.status(401).send(error.error_401);
  }
};

const userEndPoint = (app: Application) => {
  app.post("/api/users/create", checkUserExist, createUser);
  app.put("/api/users/verificaion", verification);
  app.post("/api/users/auth", auth);
  app.post("/api/users/getaccess", accessTokenRequest);
  app.put("/api/users/changepassword", changePassword);
  app.get("/checkauth", checkauth);
};

export default userEndPoint;
