import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateBookDto {
  @Field()
  @MinLength(3)
  body: string;
}
