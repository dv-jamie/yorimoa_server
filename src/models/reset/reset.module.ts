import { Module } from '@nestjs/common';
import { RefrigeratorsService } from '../refrigerators/refrigerators.service';
import { UsersService } from '../users/users.service';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';

@Module({
  imports: [
    UsersService,
    RefrigeratorsService
  ],
  controllers: [ResetController],
  providers: [ResetService]
})
export class ResetModule {}
