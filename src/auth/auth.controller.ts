import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/kakao')
  async loginKakao(@Body() body: any): Promise<ResponseDto> {
    const { code } = body
    const user = await this.authService.getKakaoInfo(code)
    return user
      ? {
        result: 'SUCCESS',
        data: user,
        message: null
      }
      : {
        result: 'FAILED',
        data: null,
        message: '회원 정보가 존재하지 않습니다.  '
      }
  }
}
