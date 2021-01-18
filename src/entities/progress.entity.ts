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
export class Progress extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  progres: number;

  @Field()
  @Column({ unique: true })
  bookID: number;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.progresses,
  )
  user_id: User;
}
