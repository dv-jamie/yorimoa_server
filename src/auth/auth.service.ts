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

  async login(user: User) {
    const jwtToken = this.getJwtToken(user)
    return jwtToken
  }

  async getKakaoInfo(code: string) {
    const getUserUrl = 'https://kapi.kakao.com/v2/user/me';
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${code}`,
      },
    };
    const { data } = await axios.get(getUserUrl, requestConfig)
    console.log(data.id)
    const user = await this.usersService.findOneByUid(data.id)
    return user
  }
}