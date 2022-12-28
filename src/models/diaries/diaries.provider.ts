import { DataSource } from 'typeorm';
import { Diary } from './entities/diary.entity';

export const diariesProviders = [
  {
    provide: 'DIARY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Diary),
    inject: ['DATA_SOURCE'],
  },
];