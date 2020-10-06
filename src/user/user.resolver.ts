import { AuthGuard } from './../auth/graphql.auth';
import { ContextInterface } from './../interfaces/ContextInterface';
import { UserService } from './user.service';
import { User } from './../schemas/user.schema';
import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
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
    return this.userService.create(userInput);
  }

  @Mutation(() => String)
  async login(
    @Args('loginInput') loginInput: LoginUserDto,
    @Context() ctx: ContextInterface,
  ) {
    const { maxAge } = this.userService;
    const user = await this.userService.login(
      loginInput.email,
      loginInput.password,
    );

    const token = this.userService.createToken(user.id);

    ctx.res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    return token;
  }
}
