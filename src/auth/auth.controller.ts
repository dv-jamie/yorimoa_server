import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get('login/kakao')
  async loginKakao(
    @Query('code') code: string
  ) {
    const userInfo = await this.authService.getKakaoUserInfo(code)
    const result = await this.authService.login(userInfo.id)
    return result
  }
}
