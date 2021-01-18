import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Progress } from './progress.entity';
import { Rating } from './rating.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  phone?: string;

  @Field()
  @Column()
  description?: string;

  @Field(() => [Progress])
  @OneToMany(
    () => Progress,
    progress => progress.user_id,
  )
  progresses: Progress[];

  @Field(() => [Rating])
  @OneToMany(
    () => Rating,
    rating => rating.user,
  )
  ratings: Rating[];

  @Field(() => [Comment])
  @OneToMany(
    () => Comment,
    comment => comment.user,
  )
  comments: Comment[];
}
