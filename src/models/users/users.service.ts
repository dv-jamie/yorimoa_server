import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto):Promise<ResponseDto> {
    const createdUser = await this.userRepository.save(createUserDto)
    return {
      result: 'SUCCESS',
      data: createdUser,
      message: null
    };
  }

  async findAll():Promise<ResponseDto> {
    const users = await this.userRepository.find()
    return {
      result: 'SUCCESS',
      data: users,
      message: null
    };
  }

  async findOneById(id: number):Promise<ResponseDto> {
    const user = await this.userRepository.findOneBy({ id })

    if(!user) throw new NotFoundException('해당 유저가 존재하지 않습니다.')
    
    return {
      result: 'SUCCESS',
      data: user,
      message: null
    };
  }

  async findOneByUid(uid: number) {
    const user = await this.userRepository.findOneBy({ uid })
    return user
  }
  
  async updateOne(
    id: number,
    UpdateUserDto: UpdateUserDto
  ):Promise<ResponseDto> {
    await this.userRepository.update(id, { ...UpdateUserDto })
    return {
      result: 'SUCCESS',
      data: null,
      message: null
    };
  }

  async removeOne(id: number):Promise<ResponseDto> {
    await this.userRepository.delete(id)
    return {
      result: 'SUCCESS',
      data: null,
      message: null
    };
  }
}
