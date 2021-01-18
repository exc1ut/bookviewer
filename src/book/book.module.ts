import { UserModule } from './../user/user.module';
import { Book } from '../entities/book.entity';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { Comment } from 'src/entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Rating } from 'src/entities/rating.entity';
import { Progress } from 'src/entities/progress.entity';

@Module({
  providers: [BookService, BookResolver],
  imports: [
    TypeOrmModule.forFeature([Book, Comment, Category, Rating, Progress]),
    UserModule,
  ],
})
export class BookModule {}
