import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMemoriesMediaDto {
  @IsNumber()
  @IsNotEmpty()
  memoryId: number;

  @IsString()
  @IsNotEmpty()
  url: string;
}
