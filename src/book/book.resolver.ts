import { CreateBookDto } from './dto/createBook.dto';
import { Book } from '../entities/book.entity';
import { BookService } from './book.service';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Progress } from 'src/entities/progress.entity';
import { CurrentUser, GqlAuthGuard } from 'src/auth/gql.authguard';
import { User } from 'src/entities/user.entity';

@Resolver(() => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async createBook(@Args('book') bookDto: CreateBookDto) {
    const book = this.bookService.createBook(bookDto);
    return book;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async addComment(
    @Args('bookId') id: number,
    @Args('body') body: string,
    @CurrentUser() user: User,
  ) {
    return await this.bookService.addComment(id, body, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async setRating(
    @Args('bookId') id: number,
    @Args('rating') rating: number,
    @CurrentUser() user: User,
  ) {
    return await this.bookService.setRating(id, rating, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Book)
  async setProgress(
    @Args('bookId') id: number,
    @Args('progress') progress: number,
    @CurrentUser() user: User,
  ) {
    return await this.bookService.setProgress(id, progress, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Book)
  async getBook(@Args('bookId') id: number) {
    return await this.bookService.getBook(id);
  }

  @ResolveField(() => Progress)
  async progress(
    @Parent() book: Book,
    @CurrentUser() user: User,
  ): Promise<Progress> {
    const { id } = book;
    const prog = await this.bookService.getProgress(id, user.id);
    return prog;
  }

  @ResolveField()
  async rating(
    @Parent() book: Book,
    @CurrentUser() user: User,
  ): Promise<number> {
    const { id } = book;
    const avg = await this.bookService.getAvgRating(id, user.id);
    return avg;
  }

  @ResolveField()
  async comments(@Parent() book: Book) {
    const { id } = book;
    const comments = await this.bookService.getComments(id);
    return comments;
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
