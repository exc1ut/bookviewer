import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Category } from './category.schema';
import { Comment, CommentSchema } from './comment.schema';

@ObjectType()
export class Rating {
  @Field()
  id: string;

  @Field()
  rate: number;
}

@ObjectType()
export class Progress {
  @Field()
  id: string;

  @Field()
  progress: number;
}

@ObjectType()
@Schema()
export class Book extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  author: string;

  @Field()
  @Prop({ default: 0 })
  views: number;

  @Field(() => [Rating])
  @Prop({ type: () => [Rating], default: [] })
  rating: Rating[];

  @Field()
  @Prop()
  description: string;

  @Field(() => [Progress])
  @Prop({ type: () => [Progress], default: [] })
  progress: Progress[];

  @Field(() => [Comment])
  @Prop({ type: () => [Comment], default: [] })
  comments: Comment[];

  @Field()
  @Prop({ ref: 'Category' })
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
