import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ImagesModule } from '../images/images.module';
import { stepsProviders } from '../steps/steps.provider';
import { StepsService } from './steps.service';

@Module({
  imports: [
    DatabaseModule,
    ImagesModule
  ],
  providers: [
    ...stepsProviders,
    StepsService
  ],
  exports: [StepsService]
})
export class StepsModule {}
