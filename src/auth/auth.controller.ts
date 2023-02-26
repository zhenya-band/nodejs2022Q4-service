import { Body, Controller, HttpCode, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/RefreshDto';
import { Tokens } from './interfaces/Tokens';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Public()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async signup(@Body() userDto: CreateUserDto): Promise<void> {
    await this.authService.signup(userDto);
  }

  @Post('/login')
  @Public()
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  async login(@Request() req): Promise<Tokens> {
    return await this.authService.login(req.user);
  }

  @Post('/refresh')
  @Public()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(200)
  async refresh(@Request() req): Promise<Tokens> {
    return await this.authService.login(req.user);
  }
}
