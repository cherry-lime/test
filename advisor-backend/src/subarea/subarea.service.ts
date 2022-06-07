import { Injectable } from '@nestjs/common';
import { CreateSubareaDto } from './dto/create-subarea.dto';
import { UpdateSubareaDto } from './dto/update-subarea.dto';

@Injectable()
export class SubareaService {
  create(category_id: number, createSubareaDto: CreateSubareaDto) {
    return 'This action adds a new subarea';
  }

  findAll(category_id: number) {
    return `This action returns all subarea`;
  }

  findOne(subarea_id: number) {
    return `This action returns a #${subarea_id} subarea`;
  }

  update(subarea_id: number, updateSubareaDto: UpdateSubareaDto) {
    return `This action updates a #${subarea_id} subarea`;
  }

  delete(subarea_id: number) {
    return `This action removes a #${subarea_id} subarea`;
  }
}
