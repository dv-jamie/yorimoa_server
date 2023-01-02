import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
    private userService: UsersService
  ) {}

  async findAll():Promise<ResponseDto> {
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
        'recipeImage.id',
        'recipeImage.url',
        'writer.id',
        'writer.nick',
        'writer.image',
        'diary.id',
        'diaryImage.id',
        'diaryImage.url',
        'category.id',
        'category.name',
        'theme.id',
        'theme.name',
      ])
      .leftJoin('recipe.images', 'recipeImage')
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoin('recipe.steps', 'step')
      .leftJoin('step.images', 'stepImage')
      .leftJoin('recipe.writer', 'writer')
      .leftJoin('recipe.diaries', 'diary')
      .leftJoin('diary.images', 'diaryImage')
      .leftJoin('recipe.categories', 'category')
      .leftJoin('recipe.themes', 'theme')
      .getMany()

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
        'recipe.images',
        'recipe.createdAt',
        'writer.id',
        'writer.nick',
        'writer.image',
        'recipe.id',
        'recipe.id',
        'recipe.title',
        'recipe.time',
        'recipe.serving',
        'recipe.level',
        'theme.id',
        'theme.name',
      ])
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoinAndSelect('recipe.steps', 'step')
      .leftJoin('recipe.writer', 'writer')
      .leftJoin('recipe.diaries', 'diary')
      .leftJoin('recipe.categories', 'category')
      .leftJoin('recipe.themes', 'theme')
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
