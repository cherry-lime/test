import { PartialType, PickType } from '@nestjs/swagger';
import { RecommendationDto } from './recommendation.dto';

export class UpdateRecommendationDto extends PartialType(
  PickType(RecommendationDto, ['feedback_additional_information', 'order'])
) {}
