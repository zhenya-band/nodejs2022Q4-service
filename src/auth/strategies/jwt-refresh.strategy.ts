import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: jwtConstants.JWT_SECRET_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const user = await this.authService.getUserByRefreshToken(req.body.refreshToken);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
