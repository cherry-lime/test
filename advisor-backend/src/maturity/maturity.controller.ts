import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MaturityService } from './maturity.service';
import { UpdateMaturityDto } from './dto/update-maturity.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('maturity')
@Controller('maturity')
@ApiTags('maturity')
export class MaturityController {
  constructor(private readonly maturityService: MaturityService) {}
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.maturityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMaturityDto: UpdateMaturityDto
  ) {
    return this.maturityService.update(id, updateMaturityDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.maturityService.delete(id);
  }
}
