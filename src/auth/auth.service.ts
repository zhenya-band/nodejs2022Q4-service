import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/LoginDto';
import { Tokens } from './interfaces/Tokens';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,

    private jwtService: JwtService,
  ) {}

  private readonly saltRounds = 10;

  async signup(createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.createUser(createUserDto);
  }

  async login({ login, password }: LoginDto): Promise<Tokens> {
    const user = await this.usersService.getByLogin(login);
    if (!user) {
      throw new ForbiddenException(`user with login=${login} does not exists`);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new ForbiddenException(`incorrect password`);
    }

    return await this.generateTokens(user);
  }

  async generateTokens(user: User): Promise<Tokens> {
    const payload = { login: user.login, id: user.id };
    const accessToken = this.jwtService.sign(payload);

    const refreshToken = await bcrypt.genSalt(this.saltRounds);

    return { accessToken, refreshToken };
  }
}
