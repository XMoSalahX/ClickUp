import { IsJWT } from "class-validator";

export class AuthanticationDto {
  @IsJWT()
  authorization!: string;
}
