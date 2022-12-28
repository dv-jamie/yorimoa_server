import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DiariesModule } from './models/diaries/diaries.module';
import { RecipesModule } from './models/recipes/recipes.module';
import { UsersModule } from './models/users/users.module';
import { RepliesModule } from './replies/replies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    RecipesModule,
    UsersModule,
    DiariesModule,
    DatabaseModule,
    RepliesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
