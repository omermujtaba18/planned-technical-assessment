import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './models/memories.model';
import { InjectModel } from '@nestjs/sequelize';
import { MemoriesMedia } from '../memories-media/models/memories-media.model';

@Injectable()
export class MemoriesService {
  constructor(
    @InjectModel(Memory)
    private memoryModel: typeof Memory,
  ) {}

  create(userId: number, createMemoryDto: CreateMemoryDto) {
    return this.memoryModel.create({ userId, ...createMemoryDto });
  }

  findAll() {
    return this.memoryModel.findAll({ include: [{ model: MemoriesMedia }] });
  }

  findOne(id: number) {
    return this.memoryModel.findByPk(id, {
      include: [{ model: MemoriesMedia }],
    });
  }

  update(id: number, updateMemoryDto: UpdateMemoryDto) {
    return this.memoryModel.update(updateMemoryDto, { where: { id } });
  }

  remove(id: number) {
    return this.memoryModel.destroy({ where: { id } });
  }
}
