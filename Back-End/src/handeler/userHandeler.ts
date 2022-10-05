import { userModel } from "../model/userModel";
import { Request, Response, Application } from "express";
import { Error } from "../utlities/error_response";
import checkUserExist from "../middleware/checkUserExist";
import mailHaneler from "../utlities/mail controler";
import { hashSync, compareSync } from "bcrypt";
import { config } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const error = new Error();

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, currentStatus, currentVerification } =
      req.body;

    let ver = Math.floor(Math.random() * (9999 - 999) + 999);

    if (currentStatus === "Pending") {
      ver = currentVerification;
      var mailRes = await mailHaneler(
        "ClickUp Verification Message",
        email,
        ver
      );
      res.status(200).json({ error: false });
    } else {
      var mailRes = await mailHaneler(
        "ClickUp Verification Message",
        email,
        ver
      );

      const hash = hashSync(
        password + config.server.hash,
        parseInt(config.server.salt as string)
      );

      const user = new userModel({
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
    const { email, verificationCode } = req.body;
    const result = await userModel.updateOne(
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
    const { email, password } = req.body;
    const user = await userModel.findOne(
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
  const { email } = req.body;

  try {
    const user = await userModel.findOne(
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
    const { authraization } = req.headers;
    let { password } = req.body;

    if (authraization != undefined) {
      const token = (authraization as string).split(" ")[1];
      try {
        const userToken = jwt.verify(token, config.server.jwt as string);
        const email = (userToken as JwtPayload).user._id;
        password = hashSync(
          password + config.server.hash,
          parseInt(config.server.salt as string)
        );
        await userModel.updateOne({ _id: email }, { $set: { password } });

        res.status(200).json({ error: false });
      } catch (e) {
        res.status(401).json(error.error_401);
      }
    } else {
      res.status(401).send(error.error_401);
    }
  } catch (e) {
    console.log("Error from changePassword function.");
    res.status(500).send(error.error_500);
  }
};

const checkauth = async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization !== undefined) {
      const x = jwt.verify(
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
