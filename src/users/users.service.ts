import { UserOldPasswordWrongException } from './../exceptions/userOldPasswordWrong.exeption';
import { UpdatePasswordDto } from './dto/UpdatePasswordDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.id = uuidv4();
    user.login = login;
    user.password = hashedPassword;
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
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordCorrect) {
      throw new UserOldPasswordWrongException();
    }

    user.password = newPassword;
    return this.usersRepository.save(user);
  }

  async delete(userId: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundExceptionWithMessage(userId);

    await this.usersRepository.delete({ id: userId });
  }

  async getByLogin(login: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ login });

    return user;
  }

  async getUserByRefreshToken(token: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ refreshToken: token });
    return user;
  }

  async saveRefreshToken(refreshToken: string, userId: string) {
    const user = await this.getById(userId);
    user.refreshToken = refreshToken;

    return this.usersRepository.save(user);
  }
}
