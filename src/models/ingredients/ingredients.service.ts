import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ingredient } from '../ingredients/entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @Inject('INGREDIENT_REPOSITORY')
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async createMany(ingredients: Ingredient[]) {
    const createdIngredients = await this.ingredientRepository.save(ingredients)
    
    return createdIngredients
  }
}
