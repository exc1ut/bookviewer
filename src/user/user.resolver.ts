// import { AuthGuard } from './../auth/graphql.auth';
import { ContextInterface } from './../interfaces/ContextInterface';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Query(() => [User])
  async author() {
    const name = await this.userService.findAll();

    return name;
  }

  @Mutation(() => User)
  async register(
    @Args('userInput') userInput: CreateUserDto,
    @Context() ctx: ContextInterface,
  ) {
    const { secretKey, maxAge } = this.userService;
    ctx.res.cookie('jwt', secretKey, { httpOnly: true, maxAge: maxAge * 1000 });

    return await this.userService.create(userInput);
  }

  @Mutation(() => String)
  async login(
    @Args('loginInput') loginInput: LoginUserDto,
    @Context() ctx: ContextInterface,
  ) {
    const { maxAge } = this.userService;
    const { email, password } = loginInput;
    const token = await this.authService.signIn(email, password);

    console.log(token);

    ctx.res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    return token;
  }
}
