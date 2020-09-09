import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Category } from './category.schema';

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
  @Prop({ ref: 'Category' })
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
