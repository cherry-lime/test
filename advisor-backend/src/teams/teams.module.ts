import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TeamsCRUDService } from './teams-crud.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, TeamsCRUDService],
})
export class TeamsModule {}
