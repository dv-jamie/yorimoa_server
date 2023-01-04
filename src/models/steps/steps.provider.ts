import { DataSource } from 'typeorm';
import { Step } from './entities/step.entity';

export const stepsProviders = [
  {
    provide: 'STEP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Step),
    inject: ['DATA_SOURCE'],
  },
];