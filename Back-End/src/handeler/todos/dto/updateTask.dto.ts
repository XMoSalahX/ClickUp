import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Priority, Status } from "../../../model/collectionsModel";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsOptional()
  @IsEmail()
  emailAfterAuth!: string;

  @IsOptional()
  @IsEnum(Status)
  status!: Status;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority!: Priority;
}
