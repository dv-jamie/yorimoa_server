import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  
  @UseGuards(JwtAuthGuard)
  @Get('unlink/kakao')
  async unlinkKakao(@Req() req) {
    const result = await this.authService.unlinkKakao(req.user.id)
    return result
  }
}
