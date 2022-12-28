import { Module } from '@nestjs/common';
import { DiariesService } from './diaries.service';
import { DiariesController } from './diaries.controller';
import { diariesProviders } from './diaries.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DiariesController],
  providers: [
    ...diariesProviders,
    DiariesService
  ]
})
export class DiariesModule {}
