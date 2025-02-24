import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class ShareService {
  constructor(private usersService: UsersService) {}

  async findOne(id: number) {
    return this.usersService.findOneWithMemories(id);
  }
}
