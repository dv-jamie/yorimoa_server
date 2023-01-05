import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @Inject('BOOKMARK_REPOSITORY')
    private bookmarkRepository: Repository<Bookmark>,
  ) {}

  deleteOne(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}
