import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { bookmarksProviders } from './bookmarks.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BookmarksController],
  providers: [
    ...bookmarksProviders,
    BookmarksService
  ],
  exports: [BookmarksService]
})
export class BookmarksModule {}
