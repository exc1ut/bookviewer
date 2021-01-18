import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateBookDto {
  @Field()
  @MinLength(3)
  title: string;

  @Field()
  @MinLength(3)
  author: string;

  @Field()
  @IsNotEmpty()
  category: number;

  @Field()
  @MinLength(3)
  description: string;
}
