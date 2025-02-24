import { Controller, Get, Param } from '@nestjs/common';
import { ShareService } from './share.service';
import { SkipJwtauth } from 'src/common/decorators/skip-jwt-auth/skip-jwt-auth.decorator';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @SkipJwtauth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shareService.findOne(+id);
  }
}
