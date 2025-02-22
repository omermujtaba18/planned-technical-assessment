import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MemoriesMediaService } from '../memories-media/memories-media.service';

@Controller('memories')
export class MemoriesController {
  constructor(
    private readonly memoriesService: MemoriesService,
    private readonly memoriesMediaService: MemoriesMediaService,
  ) {}

  @Post()
  create(@Req() req, @Body() createMemoryDto: CreateMemoryDto) {
    return this.memoriesService.create(req.user.id, createMemoryDto);
  }

  @Get()
  findAll() {
    return this.memoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemoryDto: UpdateMemoryDto) {
    return this.memoriesService.update(+id, updateMemoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoriesService.remove(+id);
  }

  @Post(':id/memories_media')
  @UseInterceptors(
    FilesInterceptor('media', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = path.extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  createMedia(
    @Param('id') id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.memoriesMediaService.createBulk(
      files.map((file) => ({
        memoryId: id,
        url: `http://localhost:5001/${file.path}`,
      })),
    );
  }
}
