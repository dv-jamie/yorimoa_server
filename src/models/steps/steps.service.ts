import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Step } from './entities/step.entity';

@Injectable()
export class StepsService {
  constructor(
    @Inject('STEP_REPOSITORY')
    private stepRepository: Repository<Step>,
  ) {}

  async createOrUpdateMany(steps: Step[]) {
    return await this.stepRepository.save(steps)
  }
}
