import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipesDto } from './dto/get-recipes.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
    private userService: UsersService
  ) {}

  async findAll(getRecipesDto: GetRecipesDto):Promise<ResponseDto> {
    const {
      minServing,
      maxServing,
      minTime,
      maxTime,
      minLevel,
      maxLevel,
      categoryIds,
      themeIds,
      page,
      size
    } = getRecipesDto
    const query = this.recipeRepository
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.time',
        'recipe.serving',
        'recipe.level',
        'recipe.summary',
        'recipe.createdAt',
        'image.id',
        'image.url',
        'category.id',
        'category.name',
        'theme.id',
        'theme.name',
      ]) 
      .leftJoin('recipe.images', 'image')
      .leftJoin('recipe.categories', 'category')
      .leftJoin('recipe.themes', 'theme')
      .where(`recipe.serving BETWEEN :minServing AND :maxServing`, {
        minServing, maxServing
      })
      .andWhere(`recipe.level BETWEEN :minLevel AND :maxLevel`, {
        minLevel, maxLevel
      })
      .take(size)
      .skip(page)

    if(maxTime) {
      query.andWhere(`recipe.time BETWEEN :minTime AND :maxTime`, {
        minTime, maxTime
      })
    }
    if(themeIds.length !== 0) {
      query.andWhere('theme.id IN (:themeIds)', { themeIds })
    }
    if(categoryIds.length !== 0) {
      query.andWhere('theme.id IN (:categoryIds)', { categoryIds })
    }

    const recipes = await query.getMany()

    return {
      status: 200,
      data: recipes,
    };
  }

  async findAllByUser(id: number):Promise<ResponseDto> {
    const recipes = await this.recipeRepository
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.time',
        'recipe.serving',
        'recipe.level',
        'recipe.summary',
        'recipe.createdAt',
        'image.id',
        'image.url',
        'category.id',
        'category.name',
        'theme.id',
        'theme.name',
      ]) 
      .leftJoin('recipe.images', 'image')
      .leftJoin('recipe.categories', 'category')
      .leftJoin('recipe.themes', 'theme')
      .leftJoin('recipe.writer', 'writer')
      .where('writer.id = :id', { id })
      .getMany()

    return {
      status: 200,
      data: recipes,
    };
  }

  async findOneById(id: number):Promise<ResponseDto> {
    const recipe = await this.recipeRepository.findOneBy({ id })

    if(!recipe) throw new NotFoundException('해당 레시피를 찾을 수 없습니다.')

    return {
      status: 200,
      data: recipe
    };
  }

  async create(
    reqId: number,
    createRecipeDto: CreateRecipeDto
  ):Promise<ResponseDto> {
    const findWriter = await this.userService.findOneById(reqId)
    const writer = findWriter.data
    const createdRecipe = await this.recipeRepository.save({
      ...createRecipeDto,
      writer
    })
    
    return {
      status: 200,
      data: createdRecipe
    };
  }

  async updateOne(
    id: number,
    updateRecipeDto: UpdateRecipeDto
  ):Promise<ResponseDto> {
    const result = await this.recipeRepository.update(id, {
      ...updateRecipeDto
    })
    
    return {
      status: 200,
      data: result
    };
  }

  async deleteOne(id: number):Promise<ResponseDto> {
    const result = await this.recipeRepository.delete(id)
    
    return {
      status: 200,
      data: result
    };
  }

  async deleteMany(ids: number[]):Promise<void> {
    await this.recipeRepository.delete({ id: In(ids) })
  }
}
