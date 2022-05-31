import { Role } from '@prisma/client';
import { IsIn } from 'class-validator';


export class CreateUserDto {
  //@IsString()
  //@Length(1, 10)
  //username: string;

  //@Length(1, 10)
  @IsIn([Role.ASSESSOR, Role.USER])
  roles: Role;
}
