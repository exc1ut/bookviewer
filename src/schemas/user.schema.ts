import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  phone?: string;

  @Field()
  @Prop()
  description?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
