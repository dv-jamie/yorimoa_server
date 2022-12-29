import { Module } from '@nestjs/common';
import { DiariesService } from './diaries.service';
import { DiariesController } from './diaries.controller';
import { diariesProviders } from './diaries.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule
  ],
  controllers: [DiariesController],
  providers: [
    ...diariesProviders,
    DiariesService
  ]
})
export class DiariesModule {}
