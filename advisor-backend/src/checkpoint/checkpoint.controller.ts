import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
}from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { CheckpointDto } from './dto/checkpoint.dto';
@ApiTags('checkpoint')
@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Post()
  create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.create(createCheckpointDto);
  }

  @Get()
  findAll() {
    return this.checkpointService.findAll();
  }
/**
   * [GET] /checkpoint/:checkpoint_id - Get checkpoint by id
   * @param id - Template id
   * @returns checkpointDto
   */
 @Get(':checkpoint_id')
 @ApiResponse({
   description: 'Found checkpoint',
   type: CheckpointDto,
 })
 @ApiNotFoundResponse({
   description: 'checkpoint not found',
 })
 findOne(@Param('checkpoint_id', ParseIntPipe) id: number) {
   return this.checkpointService.findOne(id);
 }

  /**
   * [PATCH] /checkpoint/:checkpoint_id - Update checkpoint by id
   * @param id - Template id
   * @param UpdateCheckpointDto - Template update information
   * @returns checkpointDto
   */
   @Patch(':checkpoint_id')
   @ApiResponse({ description: 'Updated checkpoint', type: CheckpointDto })
   @ApiNotFoundResponse({ description: 'checkpoint not found' })
   @ApiBadRequestResponse({
     description: 'Order must be less than number of categories in template',
   })
   update(
     @Param('checkpoint_id', ParseIntPipe) id: number,
     @Body() updatecheckpointDto: UpdateCheckpointDto
   ) {
     return this.checkpointService.update(id, updatecheckpointDto);
   }
 

 /**
   * [DELETE] /checkpoint/:checkpoint_id - Delete checkpoint
   * @param id - checkpoint id
   * @returns Deleted checkpoint
   */
  @Delete(':checkpoint_id')
  @ApiResponse({ description: 'Deleted checkpoint', type: CheckpointDto })
  @ApiNotFoundResponse({ description: 'checkpoint not found' })
  delete(@Param('checkpoint_id', ParseIntPipe) id: number) {
    return this.checkpointService.delete(+id);
  }
}