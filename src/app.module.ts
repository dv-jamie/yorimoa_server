import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
      envFilePath: ['.env.development.local', '.env.development'],
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
    }
  ],
})
export class AppModule {}
