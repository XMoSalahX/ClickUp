import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {
    message: "Password is too weak",
  })
  password!: string;

  get lowerCaseEmail(): string {
    return this.email.toLowerCase();
  }
}
