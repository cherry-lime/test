import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckpointsService } from './checkpoints.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

@Controller('checkpoints')
export class CheckpointsController {
  constructor(private readonly checkpointsService: CheckpointsService) {}

  @Post()
  create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointsService.create(createCheckpointDto);
  }

  @Get()
  findAll() {
    return this.checkpointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkpointsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckpointDto: UpdateCheckpointDto) {
    return this.checkpointsService.update(+id, updateCheckpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkpointsService.remove(+id);
  }
}
