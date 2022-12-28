import { DataSource } from 'typeorm';
import { Recipe } from './entities/recipe.entity';

export const recipesProviders = [
  {
    provide: 'RECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Recipe),
    inject: ['DATA_SOURCE'],
  },
];