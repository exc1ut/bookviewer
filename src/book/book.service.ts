import { ContextInterface } from './../interfaces/ContextInterface';
import { UserService } from './../user/user.service';
import { CreateBookDto } from './dto/createBook.dto';
import { Book, Rating, Progress } from './../schemas/book.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';
import { Context } from '@nestjs/graphql';
import * as _ from 'lodash';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private userService: UserService,
  ) {}

  async createBook(bookdto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel(bookdto);
    await book.save();
    return book;
  }
  async getBook(id: string): Promise<Book> {
    const book = this.bookModel.findById(id).populate('category');
    return book;
  }

  async addComment(bookId: string, body: string, token: any): Promise<Book> {
    const book = await this.bookModel.findById(bookId);

    const newComment = new this.commentModel();
    newComment.body = body;

    newComment.commentUser = await this.userService.findById(token.id);

    book.comments.push(newComment);

    book.markModified('comments');

    console.log(book);

    await book.save();

    return book;
  }

  async addRating(bookId: string, rating: number, token: any) {
    const book = await this.bookModel.findById(bookId);
    const userId = token.id;
    const commentRating = new Rating();
    commentRating.id = userId;
    commentRating.rate = rating;

    const checkRating = book.rating.filter(data => data.id === userId);

    if (checkRating.length >= 1) {
      throw Error('Already rated');
    }

    book.rating.push(commentRating);

    book.markModified('rating');

    await book.save();

    return book;
  }

  async setProgress(bookId: string, progress: number, token: any) {
    const book = await this.bookModel.findById(bookId);
    const userId = token.id;
    const bookProgress = new Progress();
    bookProgress.id = userId;
    bookProgress.progress = progress;

    const checkUserProgress = _.findIndex(book.progress, o => o.id == userId);

    if (checkUserProgress < 0) {
      book.progress.push(bookProgress);
    } else {
      book.progress[checkUserProgress] = bookProgress;
    }

    book.markModified('progress');

    await book.save();

    return book;
  }
}
