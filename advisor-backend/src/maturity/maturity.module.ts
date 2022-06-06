import { Module } from '@nestjs/common';
import { MaturityService } from './maturity.service';
import { MaturityController } from './maturity.controller';

@Module({
  controllers: [MaturityController],
  providers: [MaturityService]
})
export class MaturityModule {}
