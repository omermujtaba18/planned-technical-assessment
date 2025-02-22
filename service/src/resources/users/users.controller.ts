import {
  Controller,
  Body,
  Patch,
  Req,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  get(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Patch('/me')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
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
  update(
    @Req() req,
    @UploadedFile() file?: Express.Multer.File,
    @Body() updateUserDto?: UpdateUserDto,
  ) {
    if (file) {
      updateUserDto.profilePicture = `http://localhost:5001/uploads/${file.filename}`;
    }
    return this.usersService.update(req.user.id, updateUserDto);
  }
}
