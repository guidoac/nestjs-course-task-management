import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from '../app/users/dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('signin')
  async signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authCredentialsDto);
  }
}
