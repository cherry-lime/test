import { ApiProperty } from '@nestjs/swagger';

export class ScorePerTopicDto {
  @ApiProperty({ example: 1 })
  topic_id: number;

  @ApiProperty({
    example: [
      {
        maturity_id: 1,
        category_id: 1,
        score: 100,
      },
      {
        maturity_id: 1,
        category_id: 2,
        score: 100,
      },
      {
        maturity_id: 2,
        category_id: 1,
        score: 100,
      },
      {
        maturity_id: 2,
        category_id: 2,
        score: 50,
      },
    ],
  })
  scores: [
    {
      maturity_id: number;
      category_id: number;
      score: number;
    }
  ];

  @ApiProperty({
    example: {
      '1': 100,
      '2': 75,
    },
  })
  maturity_total: Record<string, number>;

  @ApiProperty({
    example: {
      '1': 100,
      '2': 75,
    },
  })
  category_total: Record<string, number>;

  @ApiProperty({ example: 87.5 })
  total: number;
}
