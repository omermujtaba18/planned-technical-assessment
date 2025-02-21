import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  timestamp: Date;

  @IsString()
  @IsNotEmpty()
  description: string;
}
