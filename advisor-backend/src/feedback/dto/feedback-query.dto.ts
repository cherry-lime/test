import { ApiPropertyOptional } from '@nestjs/swagger';

export class FeedbackQueryDto {
  @ApiPropertyOptional()
  topic_id?: number;
}
