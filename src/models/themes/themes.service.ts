import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Theme } from './entities/theme.entity';

@Injectable()
export class ThemesService {
  constructor(
    @Inject('THEME_REPOSITORY')
    private themeRepository: Repository<Theme>,
  ) {}

  async findAll() {
    const themes = await this.themeRepository.find()
    return themes;
  }
}
