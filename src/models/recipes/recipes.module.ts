import { forwardRef, Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { recipesProviders } from './recipes.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { ingredientsProviders } from '../ingredients/ingredients.provider';
import { stepsProviders } from '../steps/steps.provider';
import { ThemesModule } from '../themes/themes.module';
import { ImagesModule } from '../images/images.module';
import { CategoriesModule } from '../categories/categories.module';
import { DiariesModule } from '../diaries/diaries.module';
import { IngredientsModule } from '../ingredients/ingreditns.module';
import { StepsModule } from '../steps/steps.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ThemesModule,
    CategoriesModule,
    ImagesModule,
    IngredientsModule,
    StepsModule,
    forwardRef(() => DiariesModule)
  ],
  controllers: [RecipesController],
  providers: [
    ...recipesProviders,
    ...ingredientsProviders,
    ...stepsProviders,
    RecipesService
  ],
  exports: [RecipesService]
})
export class RecipesModule {}
