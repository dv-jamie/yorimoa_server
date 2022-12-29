import { DataSource } from 'typeorm';
import { Theme } from './entities/theme.entity';

export const themesProviders = [
  {
    provide: 'THEME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Theme),
    inject: ['DATA_SOURCE'],
  },
];