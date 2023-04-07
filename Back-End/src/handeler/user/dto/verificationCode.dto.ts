import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class VerificationCodeDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNumber()
  verificationCode!: number;

  get lowerCaseEmail(): string {
    return this.email.toLowerCase();
  }
}
