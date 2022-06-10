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
  @Get(':maturity_id')
  findOne(@Param('maturity_id', ParseIntPipe) id: number) {
    return this.maturityService.findOne(id);
  }

  @Patch(':maturity_id')
  update(
    @Param('maturity_id', ParseIntPipe) id: number,
    @Body() updateMaturityDto: UpdateMaturityDto
  ) {
    return this.maturityService.update(id, updateMaturityDto);
  }

  @Delete(':maturity_id')
  delete(@Param('maturity_id', ParseIntPipe) id: number) {
    return this.maturityService.delete(id);
  }
}
