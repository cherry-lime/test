import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class TopicDto {
  @ApiProperty({ default: 1 })
  topic_id: number;

  @ApiProperty({ default: 'New Topic' })
  topic_name: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  disabled: boolean;

  @ApiProperty({ default: 1 })
  template_id: number;
}
