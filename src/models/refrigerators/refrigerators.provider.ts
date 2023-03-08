import { DataSource } from 'typeorm';
import { Refrigerator } from './entities/refrigerator.entity';

export const refrigeratorsProviders = [
  {
    provide: 'REFRIGERATOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Refrigerator),
    inject: ['DATA_SOURCE'],
  },
];