import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private themeRepository: Repository<Category>,
  ) {}

  async findAll() {
    const themes = await this.themeRepository.find()
    return themes;
  }
}
