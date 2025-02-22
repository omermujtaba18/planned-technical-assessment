import { Module } from '@nestjs/common';
import { MemoriesMediaService } from './memories-media.service';
import { MemoriesMediaController } from './memories-media.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MemoriesMedia } from './models/memories-media.model';

@Module({
  imports: [SequelizeModule.forFeature([MemoriesMedia])],
  controllers: [MemoriesMediaController],
  providers: [MemoriesMediaService],
  exports: [MemoriesMediaService],
})
export class MemoriesMediaModule {}
