import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { repliesProviders } from './replies.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RepliesController],
  providers: [
    ...repliesProviders,
    RepliesService
  ]
})
export class RepliesModule {}
