import { Schema, model } from "mongoose";

// Database Schema
const user = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  verification: { type: Number, required: true },
});

export const userModel = model("user", user);
