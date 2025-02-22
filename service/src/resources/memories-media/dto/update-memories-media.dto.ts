import { PartialType } from '@nestjs/swagger';
import { CreateMemoriesMediaDto } from './create-memories-media.dto';

export class UpdateMemoriesMediaDto extends PartialType(
  CreateMemoriesMediaDto,
) {}
