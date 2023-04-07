import { IsJWT, Matches } from "class-validator";

export class ChangPasswordDto {
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {
    message: "Password is too weak",
  })
  password!: string;

  @IsJWT()
  authraization!: string;
}
