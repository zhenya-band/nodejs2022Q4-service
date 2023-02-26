import { Body, Controller, HttpCode, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { AuthService } from './auth.service';
import { SignupResponse } from './interfaces/SignupResponse';
import { Tokens } from './interfaces/Tokens';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Public()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async signup(@Body() userDto: CreateUserDto): Promise<SignupResponse> {
    return await this.authService.signup(userDto);
  }

  @Post('/login')
  @HttpCode(200)
  @Public()
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<Tokens> {
    return await this.authService.login(req.user);
  }

  @Post('/refresh')
  @HttpCode(200)
  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Request() req): Promise<Tokens> {
    return await this.authService.login(req.user);
  }
}
