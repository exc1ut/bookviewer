import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserArgs {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
