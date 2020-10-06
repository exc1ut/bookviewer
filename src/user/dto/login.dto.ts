import { IsEmail, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(3)
  password: string;
}
