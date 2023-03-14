import { Controller, Param, Delete } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller('reset')
export class ResetController {
  constructor(private readonly resetService: ResetService) {}

  @Delete(':id')
  remove(@Param('id') userId: number) {
    return this.resetService.resetData(userId);
  }
}
