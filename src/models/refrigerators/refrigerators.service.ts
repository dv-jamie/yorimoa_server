import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';
import { CreateRefrigeratorDto } from './dto/create-refrigerator.dto';
import { GetRefrigeratorsDto } from './dto/get-refrigerators.dto';
import { UpdateRefrigeratorDto } from './dto/update-refrigerator.dto';
import { Refrigerator } from './entities/refrigerator.entity';
import { RefrigeratorTagType } from './types/refrigerators.type';

@Injectable()
export class RefrigeratorsService {
  constructor(
    @Inject('REFRIGERATOR_REPOSITORY')
    private refrigeratorRepository: Repository<Refrigerator>,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
  ) {}

  async findOneById(id: number): Promise<ResponseDto> {
    const refrigerator = await this.refrigeratorRepository.findOneBy({ id })
    
    if(!refrigerator) throw new NotFoundException('해당 재료를 찾을 수 없습니다.')
  
    return {
      status: 200,
      data: refrigerator
    };
  }

  async findAllByUser(
    userId: number,
    getRefrigeratorsDto: GetRefrigeratorsDto
  ): Promise<ResponseDto> {
    const {
      categoryId,
      keyword,
      page,
      size
    } = getRefrigeratorsDto
    const query = this.refrigeratorRepository
      .createQueryBuilder('refrigerator')
      .select([
        'refrigerator.id',
        'refrigerator.name',
        'refrigerator.boughtAt',
        'refrigerator.eatTag',
        'refrigerator.buyTag',
        'category.id',
      ])
      .leftJoin('refrigerator.category', 'category')
      .leftJoin('refrigerator.writer', 'writer')
      .where('writer.id = :userId', { userId })
      .take(size)
      .skip(page)

    if(categoryId) {
      query.andWhere('category.id = :categoryId', { categoryId })
    }
    if(keyword) {
      query.andWhere('refrigerator.name LIKE :keyword', { keyword: `%${keyword}%` })
    }

    const [list, count] = await query
      .addOrderBy('refrigerator.boughtAt', 'ASC')
      .addOrderBy('refrigerator.eatTag', 'DESC')
      .addOrderBy('refrigerator.buyTag', 'DESC')
      .getManyAndCount()

    return {
      status: 200,
      data: { list, count },
    };
  }

  async create(
    reqId: number,
    createRefrigeratorDto: CreateRefrigeratorDto
  ): Promise<ResponseDto> {
    const { name, boughtAt, categoryId } = createRefrigeratorDto
    const findWriter = await this.usersService.findOneById(reqId)
    const writer = findWriter.data
    const category = await this.categoriesService.findOneById(categoryId)
    const createdRefrigerator = await this.refrigeratorRepository.save({
      name,
      boughtAt,
      category,
      writer,
    })

    return {
      status: 200,
      data: createdRefrigerator
    };
  }

  async updateMany(
    updateRefrigeratorDtos: UpdateRefrigeratorDto[]
  ): Promise<ResponseDto> {
    const results: UpdateResult[] = []
    for(let refrigeratorDto of updateRefrigeratorDtos) {
      const { id, ...updateDto } = refrigeratorDto
      const result = await this.refrigeratorRepository.update(id, { ...updateDto })
      results.push(result)
    }

    return {
      status: 200,
      data: results
    };
  }

  async deleteMany(ids: number[]): Promise<ResponseDto> {
    const results: DeleteResult[] = []
    for(let id of ids) {
      const result = await this.refrigeratorRepository.delete(id)
      results.push(result)
    }

    return {
      status: 200,
      data: results
    };
  }

  async deleteAllByUser(id: number): Promise<ResponseDto> {
    const result = await this.refrigeratorRepository
      .createQueryBuilder('refrigerator')
      .delete()
      .from(Refrigerator)
      .where('writer = :id', { id })
      .execute()

    return {
      status: 200,
      data: result
    };
  }

  async toggleTag(
    id: number,
    type: RefrigeratorTagType
  ): Promise<ResponseDto> {
    let result: UpdateResult
    let findTag: Refrigerator
    let newTag: boolean
    switch(type) {
      case RefrigeratorTagType.EAT :
        findTag = await this.refrigeratorRepository.findOne({
          select: ['eatTag'],
          where: { id }
        })
        newTag = findTag.eatTag ? false : true
        result = await this.refrigeratorRepository.update(id, { eatTag: newTag })
        break
      case RefrigeratorTagType.BUY :
        findTag = await this.refrigeratorRepository.findOne({
          select: ['buyTag'],
          where: { id }
        })
        newTag = findTag.buyTag ? false : true
        result = await this.refrigeratorRepository.update(id, { buyTag: newTag })
        break
      default :
        throw new BadRequestException('잘못된 요청입니다.')
    }

    return {
      status: 200,
      data: result
    };
  }
}
