import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { Theme } from '../themes/entities/theme.entity';
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
    private usersService: UsersService,
    private imagesService: ImagesService,
    private themesService: ThemesService
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

    if(!diary) throw new NotFoundException('해당 요리일기를 찾을 수 없습니다.')

    return {
      status: 200,
      data: diary
    };
  }

  async create(
    reqId: number,
    createDiaryDto: CreateDiaryDto
  ):Promise<ResponseDto> {
    const findWriter = await this.usersService.findOneById(reqId)
    const writer = findWriter.data
    const { content, themeIds, imageUrls, recipes } = createDiaryDto
    
    if(themeIds.length === 0 && imageUrls.length === 0) {
      throw new BadRequestException('테마와 이미지는 필수값입니다.')
    }

    const themes:Theme[] = []
    for(const id of themeIds) {
      const theme = await this.themesService.findOneById(id)
      themes.push(theme)
    }

    const newDiary = { content, writer, themes, recipes }
    const createdDiary = await this.diaryRepository.save(newDiary)

    for(const url of imageUrls) {
      const newImage = new Image 
      newImage.url = url
      newImage.diary = createdDiary
      await this.imagesService.create(newImage)
    }

    return {
      status: 200,
      data: createdDiary
    };
  }

  async updateOne(
    id: number,
    updateDiaryDto: UpdateDiaryDto
  ):Promise<ResponseDto> {
    const { content, themeIds, imageUrls, recipes } = updateDiaryDto
    const findDiary = await this.findOneById(id)
    const diary = findDiary.data
    
    if(content) {
      diary.content = content
      console.log(diary)
    }
    
    if(themeIds) {
      const themes:Theme[] = []
      for(const id of themeIds) {
        const theme = await this.themesService.findOneById(id)
        themes.push(theme)
      }
      diary.themes = themes
    }

    if(recipes) {
      diary.recipes = recipes
    }

    await this.diaryRepository.save(diary)

    if(imageUrls) {
      await this.imagesService.deleteAllByType('diary', id)

      for(const url of imageUrls) {
        const newImage = new Image 
        newImage.url = url
        newImage.diary = diary
        await this.imagesService.create(newImage)
      }
    }
    
    return {
      status: 200,
      data: 'SUCCESS'
    };
  }

  async removeOne(id: number):Promise<ResponseDto> {
    await this.diaryRepository.delete(id)
    
    return {
      status: 200,
      data: 'SUCCESS'
    };
  }
}
