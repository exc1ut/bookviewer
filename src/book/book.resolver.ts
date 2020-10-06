import { User } from './../schemas/user.schema';
import { UserService } from './../user/user.service';
import { ContextInterface } from './../interfaces/ContextInterface';
import { AuthGuard } from './../auth/graphql.auth';
import { CreateBookDto } from './dto/createBook.dto';
import { Book } from './../schemas/book.schema';
import { BookService } from './book.service';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Comment } from 'src/schemas/comment.schema';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private userService: UserService,
  ) {}

  @Mutation(() => Book)
  async createBook(@Args('book') bookDto: CreateBookDto) {
    const book = this.bookService.createBook(bookDto);
    return book;
  }

  @Query(() => Book)
  async getBook(@Args('bookId') id: string) {
    return await this.bookService.getBook(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Book)
  async addComment(
    @Args('bookId') id: string,
    @Args('body') body: string,
    @Context() ctx: ContextInterface,
  ) {
    const userId = ctx.userId;

    return await this.bookService.addComment(id, body, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Book)
  async addRating(
    @Args('bookId') id: string,
    @Args('rating') rating: number,
    @Context() ctx: ContextInterface,
  ) {
    const userId = ctx.userId;
    return await this.bookService.addRating(id, rating, userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Book)
  async setProgress(
    @Args('bookId') id: string,
    @Args('progress') progress: number,
    @Context() ctx: ContextInterface,
  ) {
    const userId = ctx.userId;
    return await this.bookService.setProgress(id, progress, userId);
  }

  // @UseGuards(AuthGuard)
  // @Mutation(()=>Book)
  // async like(@Args('bookId') id:string,@Context() ctx:ContextInterface){
  //   const userId = ctx.userId;
  //   return await this.bookService.like(id, userId);
  // }

  // @ResolveField('commentUser', () => String)
  // async getAuthor(@Parent() comment: Comment) {
  //   const { commentUser } = comment;
  //   console.log(comment);

  //   return commentUser;
  // }
}
