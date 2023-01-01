import { DataSource } from 'typeorm';
import { Image } from './entities/image.entity';

export const imagesProviders = [
  {
    provide: 'IMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Image),
    inject: ['DATA_SOURCE'],
  },
];