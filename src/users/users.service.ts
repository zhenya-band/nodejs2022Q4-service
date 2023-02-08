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

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = uuidv4();
    user.login = login;
    user.password = password;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    user.version = 1;

    return await this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
