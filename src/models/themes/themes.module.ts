import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { themesProviders } from './themes.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ThemesController],
  providers: [
    ...themesProviders,
    ThemesService
  ],
  exports: [ThemesService]
})
export class ThemesModule {}
