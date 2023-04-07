import { IsString } from "class-validator";

export class CheckTaskExistDto {
  @IsString()
  _id!: string;
}
