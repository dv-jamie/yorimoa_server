import { DataSource } from 'typeorm';
import { Reply } from './entities/reply.entity';

export const repliesProviders = [
  {
    provide: 'REPLY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Reply),
    inject: ['DATA_SOURCE'],
  },
];