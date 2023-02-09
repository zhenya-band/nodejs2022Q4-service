import { UserOldPasswordWrongException } from './../exceptions/userOldPasswordWrong.exeption';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './user.entity';
import { NotFoundExceptionWithMessage } from 'src/exceptions/NorFound.exeption';

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

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundExceptionWithMessage(id);

    return user;
  }

  async updatePassword(userId: string, { oldPassword, newPassword }: UpdatePasswordDto): Promise<User> {
    const user = await this.getById(userId);

    if (user.password !== oldPassword) {
      throw new UserOldPasswordWrongException();
    }

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version = user.version + 1;

    return this.usersRepository.save(user);
  }

  async delete(userId: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundExceptionWithMessage(userId);

    await this.usersRepository.delete({ id: userId });
  }
}
