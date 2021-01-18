import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { Payload } from 'src/interfaces/Payload.interface';
import { UserService } from 'src/user/user.service';

const cookieExtractor = function(req: Request) {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: 'MySecret',
    });
  }

  async validate(payload: Payload) {
    const { id } = payload;
    const user = this.userService.findById(id);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
