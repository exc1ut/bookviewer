import { Book } from './book.entity';
import { User } from './user.entity';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number | null;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.comments,
  )
  user!: User;

  @Field(() => Book)
  @ManyToOne(
    () => Book,
    book => book.comments,
  )
  book!: Book;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: string;

  @Field()
  @Column()
  body!: string;

  @Field()
  @Column({ default: 0 })
  likes!: number;

  @Field()
  @Column({ default: 0 })
  dislikes!: number;
}
