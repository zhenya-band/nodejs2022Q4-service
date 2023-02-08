import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save({
      id: uuidv4(),
      ...userDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    });
  }
}
