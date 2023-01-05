import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { CreateImageByUrlsDto } from '../images/dto/create-image.dto';
import { RecipesService } from '../recipes/recipes.service';
import { ThemesService } from '../themes/themes.service';
import { UsersService } from '../users/users.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { GetDiariesDto } from './dto/get-diaries.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diary } from './entities/diary.entity';

@Injectable()
export class DiariesService {
  constructor(
    @Inject('DIARY_REPOSITORY')
    private diaryRepository: Repository<Diary>,
    @Inject(forwardRef(() => RecipesService))
    private recipesService: RecipesService,
    private usersService: UsersService,
    private imagesService: ImagesService,
    private themesService: ThemesService,
  ) {}

  async findAll(getDiariesDto: GetDiariesDto):Promise<ResponseDto> {
    const { themeIds, onlyRecipesLinked, page, size } = getDiariesDto
    const query = this.diaryRepository
      .createQueryBuilder('diary')
      .select([
        'diary.id',
        'diary.content',
        'diary.createdAt',
        'writer.id',
        'writer.nick',
        'writer.image',
        'recipe.id',
        'recipe.title',
        'recipe.time',
        'recipe.serving',
        'recipe.level',
        'theme.id',
        'theme.name',
        'image.id',
        'image.url',
      ])
      .leftJoin('diary.writer', 'writer')
      .leftJoin('diary.themes', 'theme')
      .leftJoin('diary.images', 'image')
      .take(size)
      .skip(page)

    onlyRecipesLinked
      ? query.innerJoin('diary.recipes', 'recipe')
      : query.leftJoin('diary.recipes', 'recipe')
    
    if(themeIds.length !== 0) {
      query.where('theme.id IN (:themeIds)', { themeIds })
    }

    const diaries = await query.getMany()

    return {
      status: 200,
      data: diaries,
    };
  }

  async findAllByUser(
    id: number,
    getDiariesDto: GetDiariesDto
  ):Promise<ResponseDto> {
    await this.usersService.findOneById(id)
    const { themeIds, onlyRecipesLinked, page, size } = getDiariesDto
    const query = this.diaryRepository
      .createQueryBuilder('diary')
      .select([
        'diary.id',
        'diary.content',
        'diary.createdAt',
        'writer.id',
        'writer.nick',
        'writer.image',
        'recipe.id',
        'recipe.title',
        'recipe.time',
        'recipe.serving',
        'recipe.level',
        'theme.id',
        'theme.name',
        'image.id',
        'image.url',
      ])
      .leftJoin('diary.writer', 'writer')
      .leftJoin('diary.themes', 'theme')
      .leftJoin('diary.images', 'image')
      .take(size)
      .skip(page)

    onlyRecipesLinked
    ? query.innerJoin('diary.recipes', 'recipe')
    : query.leftJoin('diary.recipes', 'recipe')
    
    if(themeIds.length !== 0) {
      query.where('theme.id IN (:themeIds)', { themeIds })
    }

    const diaries = await query
      .andWhere('writer.id = :id', { id })
      .getMany()

    return {
      status: 200,
      data: diaries
    };
  }

  async findOneById(id: number):Promise<ResponseDto> {
    const diary = await this.diaryRepository
      .createQueryBuilder('diary')
      .select([
        'diary.id',
        'diary.content',
        'diary.createdAt',
        'writer.id',
        'writer.nick',
        'writer.image',
        'theme.id',
        'theme.name',
        'image.id',
        'image.url',
        'recipe.id',
        'recipe.title',
        'recipe.time',
        'recipe.serving',
        'recipe.level',
      ])
      .leftJoin('diary.writer', 'writer')
      .leftJoin('diary.themes', 'theme')
      .leftJoin('diary.images', 'image')
      .leftJoin('diary.recipes', 'recipe')
      .where('diary.id = :id', { id })
      .getOne()

    if(!diary) throw new NotFoundException('해당 일기를 찾을 수 없습니다.')

    return {
      status: 200,
      data: diary
    };
  }

  async create(
    reqId: number,
    createDiaryDto: CreateDiaryDto
  ):Promise<ResponseDto> {
    const { content, themeIds, images, recipeIds } = createDiaryDto
    const findWriter = await this.usersService.findOneById(reqId)
    const writer = findWriter.data
    const themes = await this.themesService.returnThemesById(themeIds)
    const recipes = await this.recipesService.returnRecipesById(recipeIds)
    const createdDiary = await this.diaryRepository.save({
      content,
      writer,
      themes,
      recipes
    })
    const imageUrls = images.map(image => image.url)
    const createImageByUrlsDto = { urls: imageUrls, diary: createdDiary}
    await this.imagesService.createByUrls(createImageByUrlsDto)

    return {
      status: 200,
      data: createdDiary
    };
  }

  async updateOne(
    id: number,
    updateDiaryDto: UpdateDiaryDto
  ):Promise<ResponseDto> {
    const { content, themeIds, images, recipeIds } = updateDiaryDto
    const findDiary = await this.findOneById(id)
    const diary = findDiary.data
    
    if(content) {
      diary.content = content
    }
    if(themeIds) {
      const themes = await this.themesService.returnThemesById(themeIds)
      diary.themes = themes
    }
    if(recipeIds) {
      const recipes = await this.recipesService.returnRecipesById(recipeIds)
      diary.recipes = recipes
    }

    await this.diaryRepository.save(diary)

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

      const createImageByUrlsDto:CreateImageByUrlsDto = { urls, diary }
      await this.imagesService.createByUrls(createImageByUrlsDto)
    }
    
    return {
      status: 200,
      data: 'SUCCESS'
    };
  }

  async deleteOne(id: number):Promise<ResponseDto> {
    const diary = await this.diaryRepository.findOneBy({ id })

    if(!diary) throw new NotFoundException('이미 삭제된 일기입니다.')
    
    await this.diaryRepository.delete(id)

    return {
      status: 200,
      data: 'SUCCESS'
    };
  }

  async returnDiariesById(ids: number[]) {
    const diaries:Diary[] = []
    for(const id of ids) {
      const findDiaryById = await this.findOneById(id)
      const diary = findDiaryById.data
      diaries.push(diary)
    }
    
    return diaries
  }
}
