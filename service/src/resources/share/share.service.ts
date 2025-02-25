import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MemoriesService } from '../memories/memories.service';

@Injectable()
export class ShareService {
  constructor(
    private usersService: UsersService,
    private memoriesService: MemoriesService,
  ) {}

  async findOneByUserId(id: number) {
    return this.usersService.findOne(id);
  }

  async findAllMemoriesByUserId(
    id: number,
    page: number,
    limit: number,
    order: string,
  ) {
    return this.memoriesService.findAllByUserId(id, page, limit, order);
  }
}
