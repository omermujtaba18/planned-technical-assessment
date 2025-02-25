import { Controller, Get, Param, Query } from '@nestjs/common';
import { ShareService } from './share.service';
import { SkipJwtauth } from '../../common/decorators/skip-jwt-auth/skip-jwt-auth.decorator';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @SkipJwtauth()
  @Get('/users/:id')
  findOneByUserId(@Param('id') id: string) {
    return this.shareService.findOneByUserId(+id);
  }

  @SkipJwtauth()
  @Get('/users/:id/memories')
  findAllMemoriesByUserId(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order') order: string,
  ) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    order = order || 'DESC';

    return this.shareService.findAllMemoriesByUserId(+id, page, limit, order);
  }
}
