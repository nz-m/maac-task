import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { user } = await this.authService.login(loginDto, res);
    return res.json({ message: 'Logged in successfully' });
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token found');
    }

    const { user } = await this.authService.refreshToken(refreshToken, res);
    return res.json({ message: 'Access token refreshed successfully' });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
    res.clearCookie('accessToken');
    return res.json({ message: 'Logged out successfully' });
  }
}
