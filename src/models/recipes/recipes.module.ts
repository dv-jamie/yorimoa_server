import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { recipesProviders } from './recipes.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RecipesController],
  providers: [
    ...recipesProviders,
    RecipesService
  ]
})
export class RecipesModule {}
