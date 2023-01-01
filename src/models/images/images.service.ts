import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imageRepository: Repository<Image>,
  ) {}

  async create(image: Image) {
    const createdImages = await this.imageRepository.save(image)
    return createdImages
  }
}
