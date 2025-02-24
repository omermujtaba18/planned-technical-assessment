import { Module } from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { MemoriesController } from './memories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Memory } from './models/memories.model';
import { MemoriesMedia } from '../memories-media/models/memories-media.model';
import { MemoriesMediaService } from '../memories-media/memories-media.service';

@Module({
  imports: [SequelizeModule.forFeature([Memory, MemoriesMedia])],
  controllers: [MemoriesController],
  providers: [MemoriesService, MemoriesMediaService],
  exports: [
    MemoriesService,
    SequelizeModule.forFeature([Memory, MemoriesMedia]),
  ],
})
export class MemoriesModule {}
