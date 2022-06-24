import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TeamsCRUDService } from './teams-crud.service';
import { TeamsCRUDController } from './teams-crud.controller';

@Module({
  controllers: [TeamsController, TeamsCRUDController],
  providers: [TeamsService, TeamsCRUDService],
})
export class TeamsModule {}
