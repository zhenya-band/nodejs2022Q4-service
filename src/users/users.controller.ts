import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ReturnUserDto } from './dto/ReturnUserDto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { GetByIdDto } from 'src/common/dto/GetByIdDto';

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
    return await this.usersService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @Get(':id')
  async getById(@Param() { id }: GetByIdDto): Promise<ReturnUserDto> {
    return await this.usersService.getById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updatePassword(
    @Param() { id: userId }: GetByIdDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<ReturnUserDto> {
    return await this.usersService.updatePassword(userId, updatePasswordDto);
  }

  @UsePipes(ValidationPipe)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param() { id: userId }: GetByIdDto): Promise<void> {
    return await this.usersService.delete(userId);
  }
}
