import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { CreateImageByUrlsDto } from '../images/interfaces/images.interface';
import { Step } from './entities/step.entity';

@Injectable()
export class StepsService {
  constructor(
    @Inject('STEP_REPOSITORY')
    private stepRepository: Repository<Step>,
    private imagesService: ImagesService,
  ) {}

  async createOrUpdateMany(steps: Step[]) {
    const createdSteps = []
    for(const step of steps) {
      const { images } = step
      const createdStep = await this.stepRepository.save(step)
      const urls:string[] = []

      for(const image of images) {
        const { id, url } = image

        if(id && url.length > 0) continue
        if(id && url.length === 0) {
          await this.imagesService.deleteById(id)
          continue
        }

        urls.push(url)
      }

      const createImageByUrlsDto:CreateImageByUrlsDto = {
        urls,
        step: createdStep
      }
      await this.imagesService.createByUrls(createImageByUrlsDto)

      createdSteps.push(createdStep)
    }
    return createdSteps
  }
}
