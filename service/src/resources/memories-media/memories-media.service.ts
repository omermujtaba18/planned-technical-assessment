import { Injectable } from '@nestjs/common';
import { MemoriesMedia } from './models/memories-media.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMemoriesMediaDto } from './dto/create-memories-media.dto';

@Injectable()
export class MemoriesMediaService {
  constructor(
    @InjectModel(MemoriesMedia)
    private memoryMediaModel: typeof MemoriesMedia,
  ) {}

  create(createMemoryMediaDto: CreateMemoriesMediaDto) {
    return this.memoryMediaModel.create(createMemoryMediaDto);
  }

  createBulk(createMemoryMediaDto: CreateMemoriesMediaDto[]) {
    return this.memoryMediaModel.bulkCreate(createMemoryMediaDto);
  }
}
