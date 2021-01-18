import { UserService } from './../user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/interfaces/Payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<number | null> {
    const user = await this.userService.findByEmail(email);
    if (user?.password === pass) {
      return user.id;
    }
    return null;
  }
  async signIn(email: string, pass: string) {
    const validation = await this.validateUser(email, pass);
    if (validation === null)
      throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE);
    const payload: Payload = { id: validation };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
