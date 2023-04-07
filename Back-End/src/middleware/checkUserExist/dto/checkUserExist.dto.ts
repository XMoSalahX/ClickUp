import { IsEmail } from "class-validator";

export class CheckUserExistDto {
  @IsEmail()
  email!: string;
}
