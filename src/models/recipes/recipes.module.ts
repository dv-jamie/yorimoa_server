import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { recipesProviders } from './recipes.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule
  ],
  controllers: [RecipesController],
  providers: [
    ...recipesProviders,
    RecipesService
  ]
})
export class RecipesModule {}
