import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './models/memories.model';
import { InjectModel } from '@nestjs/sequelize';
import { MemoriesMedia } from '../memories-media/models/memories-media.model';

@Injectable()
export class MemoriesService {
  constructor(
    @InjectModel(Memory) private memoryModel: typeof Memory,
    @InjectModel(MemoriesMedia) private memoryMediaModel: typeof MemoriesMedia,
  ) {}

  async create(
    userId: number,
    createMemoryDto: Omit<CreateMemoryDto, 'media'>,
    files: Array<Express.Multer.File>,
  ) {
    const transaction = await this.memoryModel.sequelize.transaction();

    try {
      const memory = await this.memoryModel.create(
        { userId, ...createMemoryDto },
        { transaction },
      );

      const media = await this.memoryMediaModel.bulkCreate(
        files.map((file) => ({
          memoryId: memory.id,
          url: `http://localhost:5001/${file.path}`,
        })),
        { transaction },
      );

      await transaction.commit();
      return { ...memory.toJSON(), media };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findAll(
    userId: number,
    page: number = 1,
    limit: number = 10,
    order = 'DESC',
  ) {
    const offset = (page - 1) * limit;

    const { rows, count } = await this.memoryModel.findAndCountAll({
      limit,
      offset,
      order: [['timestamp', order]],
      where: { userId },
      include: [{ model: MemoriesMedia }],
    });

    return {
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findAllByUserId(
    userId: number,
    page: number = 1,
    limit: number = 10,
    order = 'DESC',
  ) {
    const offset = (page - 1) * limit;

    const { rows, count } = await this.memoryModel.findAndCountAll({
      limit,
      offset,
      order: [['timestamp', order]],
      where: { userId },
      include: [{ model: MemoriesMedia }],
    });

    return {
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findOne(id: number) {
    const memory = await this.memoryModel.findByPk(id, {
      include: [{ model: MemoriesMedia }],
    });

    if (!memory) {
      throw new NotFoundException(`Memory with ID ${id} not found`);
    }

    return memory;
  }

  remove(id: number) {
    return this.memoryModel.destroy({ where: { id } });
  }
}
