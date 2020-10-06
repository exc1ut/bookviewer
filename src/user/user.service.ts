import { User } from './../schemas/user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  public maxAge: number = 3 * 24 * 60 * 60;
  public secretKey = 'bookKey';

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });

    if (user) {
      if (password != user.password) {
        throw Error('Password is incorrect');
      }
      return user;
    }
    throw Error('User not found');
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email });
    return user;
  }

  async findAll(): Promise<User[]> {
    const user = this.userModel.find().exec();
    return user;
  }

  createToken(id: string) {
    return jwt.sign({ id }, this.secretKey, {
      expiresIn: this.maxAge,
    });
  }
}
