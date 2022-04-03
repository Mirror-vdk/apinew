import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('user')
export class AuthController {
  @Post('register')
  async register() {
    return 'Созданный пользователь';
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {}
}
