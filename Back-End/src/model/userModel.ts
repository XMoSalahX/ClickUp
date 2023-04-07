import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop({ required: true })
  _id!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: true })
  status!: string;

  @prop({ required: true })
  verification!: number;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
