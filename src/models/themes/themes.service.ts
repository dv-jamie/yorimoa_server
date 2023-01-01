import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async findOneById(id: number) {
    const theme = await this.themeRepository.findOneBy({id})

    if(!theme) throw new NotFoundException('해당 테마가 존재하지 않습니다.')
    
    return theme
  }
}
