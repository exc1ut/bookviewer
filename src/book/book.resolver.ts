import { CreateBookDto } from './dto/createBook.dto';
import { Book } from './../schemas/book.schema';
import { BookService } from './book.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

@Resolver()
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Mutation(() => Book)
  async createBook(@Args('book') bookDto: CreateBookDto) {
    const book = this.bookService.createBook(bookDto);
    return book;
  }

  @Query(() => Book)
  async getBook(@Args('bookId') id: string) {
    return await this.bookService.getBook(id);
  }
}
