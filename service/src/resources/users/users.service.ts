import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { Memory } from '../memories/models/memories.model';
import { MemoriesMedia } from '../memories-media/models/memories-media.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = undefined;

    return user;
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

  findOneWithMemories(id: number) {
    const user = this.userModel.findOne({
      where: { id },
      include: [{ model: Memory, include: [{ model: MemoriesMedia }] }],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
