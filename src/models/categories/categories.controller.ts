import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesType } from './types/categories.type';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('type/:type')
  findAllByType(
    @Param('type') type: CategoriesType
  ) {
    return this.categoriesService.findAllByType(type);
  }
}
