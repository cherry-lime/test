import { Role } from '@prisma/client';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
    @Length(1, 10)
    user_id: number;

    @IsString()
    @Length(1, 10)
    username: string;

    @Length(5, 10)
    role : Role;
}