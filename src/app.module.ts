import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DiariesModule } from './models/diaries/diaries.module';
import { RecipesModule } from './models/recipes/recipes.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchException } from './exception/catchException';
import { ThemesModule } from './models/themes/themes.module';
import { ImagesModule } from './models/images/images.module';
import { RepliesModule } from './models/replies/replies.module';
import { BookmarksModule } from './models/bookmarks/bookmarks.module';
import { RefrigeratorsModule } from './models/refrigerators/refrigerators.module';
import { ResetController } from './models/reset/reset.controller';
import { ResetService } from './models/reset/reset.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development.local',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
    RecipesModule,
    UsersModule,
    DiariesModule,
    DatabaseModule,
    RepliesModule,
    AuthModule,
    ThemesModule,
    ImagesModule,
    BookmarksModule,
    RefrigeratorsModule,
  ],
  controllers: [AppController, ResetController],
  providers: [
    AppService,
    ResetService,
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule {}
