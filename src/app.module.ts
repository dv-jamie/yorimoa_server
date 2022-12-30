import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DiariesModule } from './models/diaries/diaries.module';
import { RecipesModule } from './models/recipes/recipes.module';
import { UsersModule } from './models/users/users.module';
import { RepliesModule } from './replies/replies.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchException } from './exception/catchException';
import { ThemesModule } from './models/themes/themes.module';
import { ImagesModule } from './models/images/images.module';

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
    RepliesModule,
    AuthModule,
    ThemesModule,
    ImagesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CatchException,
    }
  ],
})
export class AppModule {}
