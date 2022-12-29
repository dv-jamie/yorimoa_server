import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/kakao')
  async loginKakao(@Body() body: any) {
    const { code } = body
    const result = await this.authService.loginKakao(code)
    return result
  }
}
