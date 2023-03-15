import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createRandomNick } from 'src/common/util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findOneById(id: number):Promise<ResponseDto> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.uid',
        'user.nick',
        'user.image',
        'user.introduction'
      ])
      .where('user.id = :id', { id })
      .getOne()

    if(!user) throw new NotFoundException('해당 유저가 존재하지 않습니다.')
    
    return {
      status: 200,
      data: user,
    };
  }

  async findOneByUid(uid: number) {
    const user = await this.userRepository.findOneBy({ uid })
    return user
  }

  async create(createUserDto: CreateUserDto):Promise<ResponseDto> {
    const nick = createRandomNick()
    const createdUser = await this.userRepository.save({ ...createUserDto, nick })
    return {
      status: 200,
      data: createdUser,
    };
  }
  
  async updateOne(
    id: number,
    UpdateUserDto: UpdateUserDto
  ):Promise<ResponseDto> {
    await this.userRepository.update(id, { ...UpdateUserDto })
    return {
      status: 200,
      data: null,
    };
  }

  async removeOne(id: number):Promise<ResponseDto> {
    await this.userRepository.delete(id)
    return {
      status: 200,
      data: null,
    };
  }
}
