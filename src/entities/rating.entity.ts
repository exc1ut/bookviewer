import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Rating extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  rate: number;

  @Field()
  @Column()
  bookID: number;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.ratings,
  )
  user: User;
}
