import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { MemoriesModule } from '../memories/memories.module';

@Module({
  imports: [UsersModule, MemoriesModule],
  controllers: [ShareController],
  providers: [ShareService, UsersService],
  exports: [ShareService],
})
export class ShareModule {}
