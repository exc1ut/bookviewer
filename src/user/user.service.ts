import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  public maxAge: number = 3 * 24 * 60 * 60;
  public secretKey = 'bookKey';

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto).save();
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email: email });

    if (user) {
      if (password != user.password) {
        throw Error('Password is incorrect');
      }
      return user;
    }
    throw Error('User not found');
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.usersRepository.findOne({ email });
    return user;
  }

  async findAll(): Promise<User[]> {
    const user = this.usersRepository.find();
    return user;
  }

  createToken(id: number) {
    return jwt.sign({ id }, this.secretKey, {
      expiresIn: this.maxAge,
    });
  }
}
