import { Schema, model } from "mongoose";

// Database Schema
const collections = new Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  priority: { type: String, required: true },
});

export const collectionsModel = model("collections", collections);
