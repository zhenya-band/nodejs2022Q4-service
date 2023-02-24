import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { Tokens } from './interfaces/Tokens';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async signup(@Body() userDto: CreateUserDto): Promise<void> {
    await this.authService.signup(userDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<Tokens> {
    return await this.authService.login(loginDto);
  }
}
