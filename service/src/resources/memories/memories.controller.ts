import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
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
  create(
    @Req() req,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createMemoryDto: CreateMemoryDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException(['At least one image should be uploaded']);
    }

    return this.memoriesService.create(req.user.id, createMemoryDto, files);
  }

  @Get()
  findAll() {
    return this.memoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memoriesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memoriesService.remove(+id);
  }
}
