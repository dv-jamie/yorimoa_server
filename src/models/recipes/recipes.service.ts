import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { DiariesService } from '../diaries/diaries.service';
import { ImagesService } from '../images/images.service';
import { ThemesService } from '../themes/themes.service';
import { UsersService } from '../users/users.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipesDto } from './dto/get-recipes.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Recipe } from './entities/recipe.entity';
import { Step } from '../steps/entities/step.entity';
import { IngredientExceptGroup, IngredientGroup } from './interfaces/ingredient.interface';
import { StepExceptGroup, StepGroup } from './interfaces/step.interface';
import { IngredientsService } from '../ingredients/ingredients.service';
import { StepsService } from '../steps/steps.service';
import { CreateImageByUrlsDto } from '../images/dto/create-image.dto';

@Injectable()
export class RecipesService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
    @Inject(forwardRef(() => DiariesService))
    private diariesService: DiariesService,
    private userService: UsersService,
    private imagesService: ImagesService,
    private themesService: ThemesService,
    private categoriesService: CategoriesService,
    private ingredientsService: IngredientsService,
    private stepsService: StepsService,
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
      keyword,
      order,
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
      .leftJoinAndSelect('recipe.bookmarks', 'bookmark')
      .where(`recipe.serving BETWEEN :minServing AND :maxServing`, {
        minServing, maxServing
      })
      .andWhere(`recipe.level BETWEEN :minLevel AND :maxLevel`, {
        minLevel, maxLevel
      })
      .orderBy(`recipe.${order}`, 'DESC')
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
    if(keyword) {
      query.andWhere('recipe.title LIKE :keyword', { keyword: `%${keyword}%` })
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
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.time',
        'recipe.serving',
        'recipe.level',
        'recipe.summary',
        'recipe.createdAt',
        'writer.id',
        'writer.nick',
        'writer.image',
        'diary.id',
        'diary.content',
      ]) 
      .leftJoin('recipe.writer', 'writer')
      .leftJoin('recipe.diaries', 'diary')
      .leftJoinAndSelect('diary.images', 'diaryImage')
      .leftJoinAndSelect('recipe.images', 'recipeImage')
      .leftJoinAndSelect('recipe.categories', 'category')
      .leftJoinAndSelect('recipe.themes', 'theme')
      .leftJoinAndSelect('recipe.ingredients', 'ingredient')
      .leftJoinAndSelect('recipe.steps', 'step')
      .leftJoinAndSelect('step.images', 'stepImage')
      .where('recipe.id = :id', { id })
      .getOne()
    
    if(!recipe) throw new NotFoundException('해당 레시피를 찾을 수 없습니다.')

    const ingredientGroups = []
    const stepGroups = []
    const generateIngredientGroup = (ingredient: Ingredient) => {
      const ingredientGroup:IngredientGroup = {
        group: ingredient.group,
        division: ingredient.division,
        indigredients: [{
          name: ingredient.name,
          amount: ingredient.amount
        }]
      }
      return ingredientGroup
    }
    const generateStepGroup = (step: Step) => {
      const stepGroup:StepGroup = {
        group: step.group,
        division: step.division,
        steps: [{
          comment: step.comment,
          tip: step.tip,
          images: step.images
        }]
      }
      return stepGroup
    }

    let curIngredientNumber = 0
    let curStepNumber = 0
    recipe.ingredients.forEach(ingredient => {
      if(ingredient.group !== curIngredientNumber) {
        const ingredientGroup = generateIngredientGroup(ingredient)
        ingredientGroups.push(ingredientGroup)
        curIngredientNumber++
      } else {
        const ingredientExceptGroup:IngredientExceptGroup = {
          name: ingredient.name,
          amount: ingredient.amount
        }
        ingredientGroups[curIngredientNumber - 1].indigredients
          .push(ingredientExceptGroup)
      }
    })
    recipe.steps.forEach(step => {
      if(step.group !== curStepNumber) {
        const stepGroup = generateStepGroup(step)
        stepGroups.push(stepGroup)
        curStepNumber++
      } else {
        const stepExceptGroup:StepExceptGroup = {
          comment: step.comment,
          tip: step.tip,
          images: step.images
        }
        stepGroups[curStepNumber - 1].steps
          .push(stepExceptGroup)
      }
    })
    recipe.ingredients = ingredientGroups
    recipe.steps = stepGroups

    return {
      status: 200,
      data: recipe
    };
  }

  async create(
    reqId: number,
    createRecipeDto: CreateRecipeDto
  ):Promise<ResponseDto> {
    const {
      images,
      steps,
      ingredients,
      themeIds,
      categoryIds,
      diaryIds,
      ...recipeDto
    } = createRecipeDto
    const findWriter = await this.userService.findOneById(reqId)
    const writer = findWriter.data
    const createdIngredients = await this.ingredientsService.createOrUpdateMany(ingredients)
    const createdSteps = await this.stepsService.createOrUpdateMany(steps)
    const themes = await this.themesService.returnThemesById(themeIds)
    const categories = await this.categoriesService.returnCategoriesById(categoryIds)
    const diaries = await this.diariesService.returnDiariesById(diaryIds)
    const createdRecipe = await this.recipeRepository.save({
      ...recipeDto,
      themes,
      categories,
      ingredients: createdIngredients,
      steps: createdSteps,
      diaries,
      writer
    })
    const imageUrls = images.map(image => image.url)
    const createImageByUrlsDto = { urls: imageUrls, recipe: createdRecipe }
    await this.imagesService.createByUrls(createImageByUrlsDto)
    
    return {
      status: 200,
      data: 'SUCCESS'
    };
  }

  async updateOne(
    id: number,
    updateRecipeDto: UpdateRecipeDto
  ):Promise<ResponseDto> {
    const {
      images,
      ingredients,
      steps,
      themeIds,
      categoryIds,
      diaryIds,
      ...recipeDto
    } = updateRecipeDto
    
    await this.recipeRepository.update(id, { ...recipeDto })

    const findRecipe = await this.findOneById(id)
    const recipe = findRecipe.data

    if(ingredients) {
      await this.ingredientsService.createOrUpdateMany(ingredients)
    }
    if(steps) {
      await this.stepsService.createOrUpdateMany(steps)
    }
    if(themeIds) {
      const themes = await this.themesService.returnThemesById(themeIds)
      recipe.themes = themes
    }
    if(categoryIds) {
      const categories = await this.categoriesService.returnCategoriesById(categoryIds)
      recipe.categories = categories
    }
    if(diaryIds) {
      const diaries = await this.diariesService.returnDiariesById(diaryIds)
      recipe.diaries = diaries
    }
    
    await this.recipeRepository.save(recipe)

    if(images) {
      const urls:string[] = []
      
      for(const image of images) {
        const { id, url } = image

        if(id && url.length > 0) continue
        if(id && url.length === 0) {
          await this.imagesService.deleteById(id)
          continue
        }

        urls.push(url)
      }

      const createImageByUrlsDto:CreateImageByUrlsDto = { urls, recipe }
      await this.imagesService.createByUrls(createImageByUrlsDto)
    }

    return {
      status: 200,
      data: 'SUCCESS'
    };
  }

  async deleteOne(id: number):Promise<ResponseDto> {
    const findRecipe = await this.findOneById(id)
    const recipe = findRecipe.data

    if(recipe.diaries.length !== 0) {
      recipe.diaries = []
      await this.recipeRepository.save(recipe)
    }

    await this.recipeRepository.delete(id)

    return {
      status: 200,
      data: 'SUCCESS'
    };
  }

  async returnRecipesById(ids: number[]) {
    const recipes:Recipe[] = []
    for(const id of ids) {
      const findRecipeById = await this.findOneById(id)
      const recipe = findRecipeById.data
      recipes.push(recipe)
    }
    
    return recipes
  }
}
