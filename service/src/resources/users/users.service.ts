import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.update(updateUserDto);
    user.password = undefined;

    return user;
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
}
