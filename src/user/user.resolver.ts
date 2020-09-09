import { AuthGuard } from './../auth/graphql.auth';
import { ContextInterface } from './../interfaces/ContextInterface';
import { UserService } from './user.service';
import { User } from './../schemas/user.schema';
import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { CreateUserArgs } from './dto/set-user.args';
import { UseGuards } from '@nestjs/common';

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
    @Args('userInput') userInput: CreateUserArgs,
    @Context() ctx: ContextInterface,
  ) {
    const { secretKey, maxAge } = this.userService;
    ctx.res.cookie('jwt', secretKey, { httpOnly: true, maxAge: maxAge * 1000 });
    return this.userService.create(userInput);
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() ctx: ContextInterface,
  ) {
    const { maxAge } = this.userService;
    const user = await this.userService.login(email, password);

    const token = this.userService.createToken(user.id);

    ctx.res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    return token;
  }
}
