import axios from 'axios';
import { Injectable } from '@nestjs/common';
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
    const jwtToken = this.getJwtToken(user)
    const result:ResponseDto = user
      ? {
        result: 'SUCCESS',
        data: { jwtToken, userId: user.id },
        message: null
      }
      : {
        result: 'FAILED',
        data: null,
        message: '회원 정보가 존재하지 않습니다.  '
      }
      
    return result
  }
}