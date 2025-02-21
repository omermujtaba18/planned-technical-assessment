import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MemoriesMedia } from './models/memories-media.model';
import { CreateMemoryMediaDto } from './dto/create-memory-media.dto';

@Injectable()
export class MemoriesMediaService {
  constructor(
    @InjectModel(MemoriesMedia)
    private memoryMediaModel: typeof MemoriesMedia,
  ) {}

  create(createMemoryMediaDto: CreateMemoryMediaDto[]) {
    return this.memoryMediaModel.bulkCreate(createMemoryMediaDto);
  }
}
