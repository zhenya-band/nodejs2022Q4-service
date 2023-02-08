import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { User } from './user.entity';
import { ReturnUserDto } from './dto/ReturnUserDto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(userDto);

    const { password, ...responseUser } = user;
    return responseUser;
  }
}
