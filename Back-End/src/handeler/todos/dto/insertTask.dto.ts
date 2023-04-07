import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Priority, Status } from "../../../model/collectionsModel";

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsEmail()
  emailAfterAuth!: string;

  @IsEnum(Status)
  status!: Status;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Priority)
  priority!: Priority;
}
