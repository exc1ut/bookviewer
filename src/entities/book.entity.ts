import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Comment } from './comment.entity';
import { Progress } from './progress.entity';

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column({ default: 0 })
  views: number;

  @Field({ nullable: true })
  rating: number;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  progress: Progress;

  @Field(() => [Comment])
  @OneToMany(
    () => Comment,
    comment => comment.book,
  )
  comments: Comment[];

  @Field(() => Category)
  @ManyToOne(
    () => Category,
    category => category.id,
  )
  category: Category;
}
