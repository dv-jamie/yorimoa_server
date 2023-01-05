import { DataSource } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';

export const bookmarksProviders = [
  {
    provide: 'BOOKMARK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Bookmark),
    inject: ['DATA_SOURCE'],
  },
];