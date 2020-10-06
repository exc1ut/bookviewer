import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Category extends Document {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  name?: string;

  @Field()
  @Prop({ default: Date.now() })
  date: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
