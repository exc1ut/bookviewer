import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookDto {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  category: string;
}
