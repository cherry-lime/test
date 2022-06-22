import { ApiProperty } from '@nestjs/swagger';

export class TopicDto {
  @ApiProperty()
  topic_id: number;

  @ApiProperty()
  topic_name: string;

  @ApiProperty()
  template_id: number;
}
