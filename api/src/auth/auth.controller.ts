import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.auth.verifyEmail(token);
  }

  @Throttle({ default: { limit: 3, ttl: 60 } })
  @Post('resend')
  async resend(@Body('email') email: string) {
    return this.auth.resend(email);
  }
}
