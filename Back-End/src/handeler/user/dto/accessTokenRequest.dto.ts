import { IsEmail, IsNotEmpty } from "class-validator";

export class AccessTokenRquestDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  get lowerCaseEmail(): string {
    return this.email.toLowerCase();
  }
}
