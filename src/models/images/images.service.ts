import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { ImageType } from './types/images.type';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imageRepository: Repository<Image>,
  ) {}

  async createByType(
    type: ImageType,
    entity: object,
    urls: string[],
  ): Promise<void> {
    for(const url of urls) {
      const newImage = new Image 
      newImage['url'] = url
      newImage[`${type}`] = entity
      await this.imageRepository.save(newImage)
    }
  }

  async deleteAllByType(type: ImageType, id: number) {
    const result = await this.imageRepository
    .createQueryBuilder('image')
    .delete()
    .from(Image)
    .where(`${type} = :id`, { id })
    .execute()

    return result
  }
}
