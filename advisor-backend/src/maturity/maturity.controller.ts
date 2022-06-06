import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaturityService } from './maturity.service';
import { CreateMaturityDto } from './dto/create-maturity.dto';
import { UpdateMaturityDto } from './dto/update-maturity.dto';

@Controller('maturity')
export class MaturityController {
  constructor(private readonly maturityService: MaturityService) {}

  @Post()
  create(@Body() createMaturityDto: CreateMaturityDto) {
    return this.maturityService.create(createMaturityDto);
  }

  @Get()
  findAll() {
    return this.maturityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maturityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaturityDto: UpdateMaturityDto) {
    return this.maturityService.update(+id, updateMaturityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maturityService.remove(+id);
  }
}
