import { Controller, Param, Delete } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.bookmarksService.deleteOne(id);
  }
}
