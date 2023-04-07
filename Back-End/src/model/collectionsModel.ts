import { prop, getModelForClass } from "@typegoose/typegoose";

export enum Status {
  TODO = "TODO",
  INprogress = "INprogress",
  UnderReview = "UnderReview",
  Rework = "Rework",
  Completed = "Completed",
}

export enum Priority {
  Medium = "Medium",
  High = "High",
  Low = "Low",
}

class ToDos {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  email!: string;

  @prop({ required: true, enum: Object.values(Status) })
  status!: Status;

  @prop({ required: true })
  title!: string;

  @prop({ required: false })
  description?: string;

  @prop({ required: true, enum: Object.values(Priority) })
  priority!: Priority;
}

const ToDoModel = getModelForClass(ToDos, {
  schemaOptions: { timestamps: true },
});

export default ToDoModel;
