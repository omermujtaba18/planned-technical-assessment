import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(1)
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @Length(1)
  @IsOptional()
  memoryLaneDescription?: string;
}
