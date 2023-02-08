import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ReturnUserDto } from './dto/ReturnUserDto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.usersService.createUser(userDto);

    const { password, ...responseUser } = user;
    return responseUser;
  }
}
