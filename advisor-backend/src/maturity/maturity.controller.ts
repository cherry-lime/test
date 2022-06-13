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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MaturityDto } from './dto/maturity.dto';

@Controller('maturity')
@ApiTags('maturity')
export class MaturityController {
  constructor(private readonly maturityService: MaturityService) {}

  @Get(':maturity_id')
  @ApiResponse({ description: 'Found maturity', type: MaturityDto })
  @ApiNotFoundResponse({ description: 'Maturity not found' })
  findOne(@Param('maturity_id', ParseIntPipe) id: number) {
    return this.maturityService.findOne(id);
  }

  @Patch(':maturity_id')
  @ApiResponse({ description: 'Updated maturity', type: MaturityDto })
  @ApiNotFoundResponse({ description: 'Maturity not found' })
  @ApiConflictResponse({
    description: 'Maturity with this name already exists',
  })
  @ApiBadRequestResponse({
    description:
      'Maturity order must be less than number of maturities in template',
  })
  update(
    @Param('maturity_id', ParseIntPipe) id: number,
    @Body() updateMaturityDto: UpdateMaturityDto
  ) {
    return this.maturityService.update(id, updateMaturityDto);
  }

  @Delete(':maturity_id')
  @ApiResponse({ description: 'Deleted maturity', type: MaturityDto })
  @ApiNotFoundResponse({ description: 'Maturity not found' })
  delete(@Param('maturity_id', ParseIntPipe) id: number) {
    return this.maturityService.delete(id);
  }
}
