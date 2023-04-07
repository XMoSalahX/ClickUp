import { IsNotEmpty, IsString } from "class-validator";

export class CheckAuthDto {
  @IsNotEmpty()
  @IsString()
  authraization!: string;
}
