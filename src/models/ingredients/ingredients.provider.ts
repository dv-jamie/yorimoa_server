import { DataSource } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';

export const ingredientsProviders = [
  {
    provide: 'INGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ingredient),
    inject: ['DATA_SOURCE'],
  },
];