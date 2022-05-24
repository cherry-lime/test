import { IsString, Length } from "class-validator";

export class LoginDto {
    @IsString()
    @Length(1, 10)
    username: string;
}