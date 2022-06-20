import { ApiProperty } from '@nestjs/swagger';

export class ScorePerTopicDto {
  @ApiProperty()
  topic_id: number;

  @ApiProperty({
    example: [
      [100, 50, 75],
      [0, 13, 6.5],
      [50, 31.5, 40.75],
    ],
  })
  scores: number[][];
}
