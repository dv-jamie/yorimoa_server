import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { Reply } from './entities/reply.entity';

@Injectable()
export class RepliesService {
  constructor(
    @Inject('REPLY_REPOSITORY')
    private replyRepository: Repository<Reply>,
  ) {}

  create(createReplyDto: CreateReplyDto) {
    return 'This action adds a new reply';
  }

  findAll() {
    return `This action returns all replies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return `This action removes a #${id} reply`;
  }
}
