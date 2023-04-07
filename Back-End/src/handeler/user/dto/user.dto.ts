import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  currentStatus!: string;

  @IsOptional()
  @IsNumber()
  currentVerification!: number;

  get lowerCaseEmail(): string {
    return this.email.toLowerCase();
  }
}
