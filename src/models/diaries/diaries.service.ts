import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
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
    private userService: UsersService
  ) {}

  async findAll(getDiariesDto: GetDiariesDto):Promise<ResponseDto> {
    const { themeIds, onlyRecipesLinked, page, size } = getDiariesDto
    const query = this.diaryRepository
      .createQueryBuilder('diary')
      .select([
        'diary.id',
        'diary.content',
        'diary.images',
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
      ])
      .leftJoin('diary.writer', 'writer')
      .leftJoin('diary.themes', 'theme')
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
    await this.userService.findOneById(id)
    const { themeIds, onlyRecipesLinked, page, size } = getDiariesDto
    const query = this.diaryRepository
      .createQueryBuilder('diary')
      .select([
        'diary.id',
        'diary.content',
        'diary.images',
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
      ])
      .leftJoin('diary.writer', 'writer')
      .leftJoin('diary.themes', 'theme')
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
        'diary.images',
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
      ])
      .leftJoin('diary.writer', 'writer')
      .leftJoin('diary.themes', 'theme')
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
    const findWriter = await this.userService.findOneById(reqId)
    const writer = findWriter.data
    const createdDiairy = await this.diaryRepository.save({
      ...createDiaryDto,
      writer
    })

    return {
      status: 200,
      data: createdDiairy
    };
  }

  async updateOne(
    id: number,
    updateDiaryDto: UpdateDiaryDto
  ):Promise<ResponseDto> {
    const result = await this.diaryRepository.update(id, {
      ...updateDiaryDto
    })
    
    return {
      status: 200,
      data: result
    };
  }

  async removeOne(id: number):Promise<ResponseDto> {
    const result = await this.diaryRepository.delete(id)
    
    return {
      status: 200,
      data: result
    };
  }
}
