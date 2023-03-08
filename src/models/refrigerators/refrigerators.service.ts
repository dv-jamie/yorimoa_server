import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';
import { CreateRefrigeratorDto } from './dto/create-refrigerator.dto';
import { GetRefrigeratorsDto } from './dto/get-refrigerators.dto';
import { UpdateRefrigeratorDto } from './dto/update-refrigerator.dto';
import { Refrigerator } from './entities/refrigerator.entity';

@Injectable()
export class RefrigeratorsService {
  constructor(
    @Inject('REFRIGERATOR_REPOSITORY')
    private refrigeratorRepository: Repository<Refrigerator>,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
  ) {}

  async findOneById(id: number):Promise<ResponseDto> {
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
  ):Promise<ResponseDto> {
    const {
      categoryIds,
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
        'category.name',
      ])
      .leftJoin('refrigerator.categories', 'category')
      .leftJoin('refrigerator.writer', 'writer')
      .where('writer.id = :userId', { userId })
      .take(size)
      .skip(page)

    if(categoryIds.length !== 0) {
      query.andWhere('category.id IN (:categoryIds)', { categoryIds })
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
  ):Promise<ResponseDto> {
    const { name, boughtAt, categoryIds } = createRefrigeratorDto
    const findWriter = await this.usersService.findOneById(reqId)
    const writer = findWriter.data
    const categories = await this.categoriesService.returnCategoriesById(categoryIds)
    const createdRefrigerator = await this.refrigeratorRepository.save({
      name,
      boughtAt,
      categories,
      writer,
    })

    return {
      status: 200,
      data: createdRefrigerator
    };
  }

  async updateMany(updateRefrigeratorDtos: UpdateRefrigeratorDto[]) {
    const results: UpdateResult[] = []
    for(let refrigeratorDto of updateRefrigeratorDtos) {
      const { id, categoryIds, ...updateDto } = refrigeratorDto
      
      await this.refrigeratorRepository.update(id, { ...updateDto })
      
      const findRefrigerator = await this.findOneById(id)
      const refrigerator = findRefrigerator.data
      
      if(categoryIds) {
        const categories = await this.categoriesService.returnCategoriesById(categoryIds)
        refrigerator.categories = categories
      }

      const result = await this.refrigeratorRepository.save(refrigerator)
      
      results.push(result)
    }

    return {
      status: 200,
      data: results
    };
  }

  async deleteMany(ids: number[]) {
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
}
