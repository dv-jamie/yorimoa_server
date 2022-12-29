import axios from 'axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
) {}

  getJwtToken(user: User) {
    const payload = { id: user.id };
    const jwtToken = this.jwtService.sign(payload) 
    return jwtToken;
  }

  async loginKakao(code: string): Promise<ResponseDto> {
    const getUserUrl = 'https://kapi.kakao.com/v2/user/me';
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${code}`,
      },
    };
    const { data } = await axios.get(getUserUrl, requestConfig)
    const user = await this.usersService.findOneByUid(data.id)

    if(!user) throw new NotFoundException('회원 정보가 존재하지 않습니다.')

    const jwtToken = this.getJwtToken(user)

    return {
      status: 200,
      data: { jwtToken, userId: user.id },
    }
  }
}