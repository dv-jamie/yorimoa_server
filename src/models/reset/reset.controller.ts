import { Controller, Req, Delete } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Delete()
  resetData(@Req() req) {
    return this.resetService.resetData(req.user.id);
  }
}
