import { UserService } from './../user/user.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const jwtToken = ctx.req.cookies.jwt;
    if (!jwtToken) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    try {
      const key = this.userService.secretKey;
      const userId = jwt.verify(jwtToken, key);
      ctx.userId = userId;
      return true;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
