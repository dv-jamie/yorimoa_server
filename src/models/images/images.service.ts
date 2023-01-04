import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imageRepository: Repository<Image>,
  ) {}

  async createByType(
    type: 'DIARY' | 'RECIPE' | 'STEP',
    entity: object,
    urls: string[],
  ): Promise<void> {
    for(const url of urls) {
      const newImage = new Image 
      newImage['url'] = url
      newImage[`${type.toLowerCase()}`] = entity
      await this.imageRepository.save(newImage)
    }
  }

  async deleteAllByType(type: 'diary' | 'recipe' | 'step', id: number) {
    const result = await this.imageRepository
    .createQueryBuilder('image')
    .delete()
    .from(Image)
    .where(`${type} = :id`, { id })
    .execute()

    return result
  }
}
