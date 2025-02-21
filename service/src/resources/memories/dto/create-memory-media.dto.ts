import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMemoryMediaDto {
  @IsNumber()
  @IsNotEmpty()
  memoryId: number;

  @IsString()
  @IsNotEmpty()
  url: string;
}
