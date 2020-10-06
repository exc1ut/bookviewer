import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Comment extends Document {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field(() => User)
  @Prop({ ref: 'User' })
  commentUser?: User;

  @Field()
  @Prop({ default: Date.now() })
  date?: Date;

  @Field()
  @Prop()
  body?: string;

  @Field()
  @Prop({ default: 0 })
  likes?: number;

  @Field()
  @Prop({ default: 0 })
  dislikes?: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
