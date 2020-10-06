import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @MinLength(3)
  @Field()
  password: string;
}
