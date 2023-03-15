import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { formUrlEncoded } from 'src/common/util';
import { User } from 'src/models/users/entities/user.entity';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';

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

  async getKakaoUserInfo(code: string) {
    const formUrlEncoded = x =>
      Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')

    const GET_TOKEN_URL = 'https://kauth.kakao.com/oauth/token'
    const GET_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me'
    const GRANT_TYPE = "authorization_code"
    const CLIENT_ID = process.env.KAKAO_REST_API_KEY
    const REDIRECT_URI = process.env.KAKAO_REDIRECT_URL
    const requestBody = formUrlEncoded({
      grant_type: GRANT_TYPE,
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code,
    }) 
    const { data } = await axios.post(
      GET_TOKEN_URL,
      requestBody,
    )
    const { data: userInfo } = await axios.get(GET_USER_INFO_URL, {
      headers: {
        Authorization: 'Bearer ' + data.access_token,
      }
    })

    return userInfo
  }

  async login(uid: number): Promise<ResponseDto> {
    const createUserDto: CreateUserDto = {
      loginType: 'KAKAO',
      uid
    }
    let user = await this.usersService.findOneByUid(uid)

    if(!user) {
      const createUser = await this.usersService.create(createUserDto)
      user = createUser.data
    }

    const jwtToken = this.getJwtToken(user)

    return {
      status: 200,
      data: { jwtToken, userId: user.id },
    }
  }

  async unlinkKakao(userId: number): Promise<ResponseDto> {
    const KAKAO_UNLINK_URL = 'https://kapi.kakao.com/v1/user/unlink'
    const { data: user } = await this.usersService.findOneById(userId)
    const requestBody = formUrlEncoded({
      target_id_type: "user_id",
      target_id: user.uid
    }) 
    const response = await axios.post(KAKAO_UNLINK_URL, requestBody, {
      headers: {
        Authorization: 'KakaoAK ' + process.env.KAKAO_ADMIN_KEY,
      }
    })

    // 서비스 내 탈퇴 처리
    if(response.status === 200) {
      await this.usersService.removeOne(userId)
    }

    return {
      status: 200,
      data: response.data,
    }
  }
}