import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    const categories = await this.categoryRepository.find()
    return categories;
  }

  async findOneById(id: number) {
    const category = await this.categoryRepository.findOneBy({id})

    if(!category) throw new NotFoundException('해당 카테고리가 존재하지 않습니다.')
    
    return category
  }

  async returnCategoriesById(ids: number[]) {
    const categories:Category[] = []
    for(const id of ids) {
      const category = await this.findOneById(id)
      categories.push(category)
    }
    
    return categories
  }
}
