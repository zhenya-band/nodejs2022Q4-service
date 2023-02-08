import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ReturnUserDto } from './dto/ReturnUserDto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<ReturnUserDto> {
    return await this.usersService.createUser(userDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getAll(): Promise<ReturnUserDto[]> {
    return await this.usersService.getAllUsers();
  }
}
