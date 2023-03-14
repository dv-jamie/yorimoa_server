import { Controller, Req, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResetService } from './reset.service';

@UseGuards(JwtAuthGuard)
@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Delete()
  resetData(@Req() req) {
    return this.resetService.resetData(req.user.id);
  }
}
