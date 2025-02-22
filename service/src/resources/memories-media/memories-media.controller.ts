import { Controller, Post, Body } from '@nestjs/common';
import { MemoriesMediaService } from './memories-media.service';
import { CreateMemoriesMediaDto } from './dto/create-memories-media.dto';

@Controller('memories-media')
export class MemoriesMediaController {
  constructor(private readonly memoriesMediaService: MemoriesMediaService) {}

  @Post()
  create(@Body() createMemoriesMediaDto: CreateMemoriesMediaDto) {
    return this.memoriesMediaService.create(createMemoriesMediaDto);
  }
}
