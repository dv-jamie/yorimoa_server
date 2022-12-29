import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoriesController } from './categories.controller';
import { categoriesProviders } from './categories.provider';
import { CategoriesService } from './categories.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [
    ...categoriesProviders,
    CategoriesService
  ]
})
export class ThemesModule {}
