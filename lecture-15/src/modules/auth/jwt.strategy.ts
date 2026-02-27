import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../users/users.service';
import { envConfig } from '../../config/env';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfig.jwtSecret,
    });
  }

  public async validate(payload: any): Promise<any> {
    const user = await this.usersService.getOne({ username: payload.username });
    if (!user || user.id !== payload.sub) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
