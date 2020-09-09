import { CreateBookDto } from './dto/createBook.dto';
import { Book } from './../schemas/book.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createBook(bookdto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel(bookdto);
    await book.save();
    return book;
  }
  async getBook(id: string): Promise<Book> {
    const book = this.bookModel.findById(id).populate('category');
    return book;
  }
}
