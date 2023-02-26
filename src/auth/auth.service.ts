import { SignupResponse } from './interfaces/SignupResponse';
import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUserDto';
import { UsersService } from 'src/users/users.service';
import { Tokens } from './interfaces/Tokens';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { jwtConstants } from './constants';
import { JwtPayload } from './interfaces/JwtPayload';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,

    private jwtService: JwtService,
  ) {}

  private readonly saltRounds = 10;

  async signup(createUserDto: CreateUserDto): Promise<SignupResponse> {
    const user = await this.usersService.createUser(createUserDto);

    return { id: user.id };
  }

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.usersService.getByLogin(login);
    if (!user) {
      throw new ForbiddenException(`user with login=${login} does not exists`);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new ForbiddenException(`incorrect password`);
    }

    return user;
  }

  async login(user: User): Promise<Tokens> {
    const tokens = await this.getTokens(user);
    await this.usersService.saveRefreshToken(tokens.refreshToken, user.id);

    return tokens;
  }

  async getUserByRefreshToken(token: string): Promise<User | null> {
    return await this.usersService.getUserByRefreshToken(token);
  }

  private async getTokens({ login, id }: User): Promise<Tokens> {
    const accessToken = await this.generateAccessToken(login, id);
    const refreshToken = await this.generateRefreshToken();

    return { accessToken, refreshToken };
  }

  private async generateAccessToken(userLogin: string, userId: string): Promise<string> {
    const payload: JwtPayload = { login: userLogin, userId };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  private async generateRefreshToken(): Promise<string> {
    const token = await bcrypt.hash(Math.random().toString(), this.saltRounds);
    const refreshToken = this.jwtService.sign(
      { token },
      { expiresIn: jwtConstants.TOKEN_REFRESH_EXPIRE_TIME, secret: jwtConstants.JWT_SECRET_REFRESH_KEY },
    );

    return refreshToken;
  }
}
