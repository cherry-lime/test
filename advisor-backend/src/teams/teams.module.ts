import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TeamsService2 } from './team.service2';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, TeamsService2],
})
export class TeamsModule {}
