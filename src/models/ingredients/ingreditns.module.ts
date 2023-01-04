import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ingredientsProviders } from '../ingredients/ingredients.provider';
import { IngredientsService } from './ingredients.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ingredientsProviders,
    IngredientsService
  ],
  exports: [IngredientsService]
})
export class IngredientsModule {}
