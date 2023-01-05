import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CreateImageByUrlsDto } from './interfaces/images.interface';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imageRepository: Repository<Image>,
  ) {}

  async createByUrls(createImageByUrlsDto: CreateImageByUrlsDto): Promise<void> {
    const { urls, recipe, step, diary } = createImageByUrlsDto

    for(const url of urls) {
      const newImage = new Image
      newImage.url = url
      if(recipe) newImage.recipe = recipe
      if(step) newImage.step = step
      if(diary) newImage.diary = diary

      await this.imageRepository.save(newImage)
    }
  }

  async deleteById(id: number | number[]): Promise<void> {
    await this.imageRepository.delete(id)
  }
}
