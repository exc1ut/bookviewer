import { Book, BookSchema } from './../schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';

@Module({
  providers: [BookService, BookResolver],
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
})
export class BookModule {}
