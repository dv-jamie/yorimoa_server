import { Module } from '@nestjs/common';
import { RefrigeratorsService } from './refrigerators.service';
import { RefrigeraotrsController } from './refrigerators.controller';
import { refrigeratorsProviders } from './refrigerators.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    CategoriesModule
  ],
  controllers: [RefrigeraotrsController],
  providers: [
    ...refrigeratorsProviders,
    RefrigeratorsService
  ],
  exports: [RefrigeratorsService]
})
export class RefrigeratorsModule {}
