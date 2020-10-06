import { UserModule } from './../user/user.module';
import { Book, BookSchema } from './../schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';

@Module({
  providers: [BookService, BookResolver],
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    UserModule,
  ],
})
export class BookModule {}
