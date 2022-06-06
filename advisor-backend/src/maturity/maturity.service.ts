import { Injectable } from '@nestjs/common';
import { CreateMaturityDto } from './dto/create-maturity.dto';
import { UpdateMaturityDto } from './dto/update-maturity.dto';

@Injectable()
export class MaturityService {
  create(createMaturityDto: CreateMaturityDto) {
    return 'This action adds a new maturity';
  }

  findAll() {
    return `This action returns all maturity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maturity`;
  }

  update(id: number, updateMaturityDto: UpdateMaturityDto) {
    return `This action updates a #${id} maturity`;
  }

  remove(id: number) {
    return `This action removes a #${id} maturity`;
  }
}
