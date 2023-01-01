import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { imagesProviders } from './images.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ImagesController],
  providers: [
    ...imagesProviders,
    ImagesService
  ],
  exports: [ImagesService]
})
export class ImagesModule {}
