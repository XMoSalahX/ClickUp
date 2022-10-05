import express, { Request, Response } from "express";
import route from "./Route/route";
import { config } from "./config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: express.Application = express();

// To Allow Front Side to Connect To our Server
app.use(cors({ origin: config.front.url, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header({ "Access-Control-Allow-Credentials": true });
  res.header({ "Access-Control-Allow-Origin": "*" });
  res.header({
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  });
  res.header({
    "Access-Control-Allow-Headers":
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
  });

  next();
});

app.listen(config.server.port, function () {
  console.log(`starting app on: ${config.server.port}`);
});

// Connection To Mongo DB
mongoose
  .connect(`${config.mongo.url}`, { dbName: config.mongo.dbName })
  .then(() => {
    console.log("MongoDB is Connnected");
  })
  .catch(() => {
    console.log("DB Connecion Error");
  });

//Route app to route file
route(app);

export default app;
