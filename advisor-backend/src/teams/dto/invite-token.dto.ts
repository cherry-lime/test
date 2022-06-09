import { ApiProperty } from '@nestjs/swagger';

export class InviteTokenDto {
  constructor(token: string) {
    this.invite_token = token;
  }

  @ApiProperty()
  invite_token: string;
}
