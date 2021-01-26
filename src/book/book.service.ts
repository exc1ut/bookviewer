import { UserService } from './../user/user.service';
import { CreateBookDto } from './dto/createBook.dto';
import { Book } from '../entities/book.entity';
import { Rating } from '../entities/rating.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Category } from 'src/entities/category.entity';
import { Progress } from 'src/entities/progress.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
    private userService: UserService,
  ) {}

  async createBook(bookdto: CreateBookDto): Promise<Book> {
    const category = await this.categoryRepository.findOne(bookdto.category);

    const book = this.bookRepository.create({ ...bookdto, category });

    return book.save();
  }
  async getBook(id: number): Promise<Book> {
    const book = this.bookRepository.findOne(id);
    return book;
  }

  async addComment(
    bookId: number,
    body: string,
    userId: number,
  ): Promise<Book> {
    const newComment = this.commentRepository.create();
    newComment.body = body;
    newComment.user = userId as any;
    newComment.book = bookId as any;
    await newComment.save();

    const book = await this.bookRepository.findOne(bookId);
    return book.save();
  }

  async setProgress(
    bookId: number,
    progress: number,
    userId: number,
  ): Promise<Book> {
    const book = await this.bookRepository.findOne(bookId);

    let Psrepo = await this.progressRepository.findOne({
      where: { bookID: bookId },
    });
    if (!Psrepo) {
      Psrepo = new Progress();
    }

    Psrepo.progres = progress;
    Psrepo.user_id = userId as any;
    Psrepo.bookID = bookId;
    await Psrepo.save();

    return book.save();
  }

  async setRating(bookId: number, rate: number, userId: number): Promise<Book> {
    const book = await this.bookRepository.findOne(bookId);

    let RatingRepo = await this.ratingRepository.findOne({
      where: { bookID: bookId },
    });
    if (!RatingRepo) {
      RatingRepo = new Rating();
    }

    RatingRepo.rate = rate;
    RatingRepo.user = userId as any;
    RatingRepo.bookID = bookId;
    await RatingRepo.save();

    return book.save();
  }

  async getProgress(bookId: number, userId: number): Promise<Progress> {
    const prog = await this.progressRepository.findOne({
      where: { bookID: bookId, user_id: userId },
    });
    console.log(bookId, userId);

    return prog;
  }

  async getAvgRating(bookId: number, userId: number): Promise<number> {
    const qb = this.ratingRepository.createQueryBuilder('rating');
    qb.select('AVG(rating.RATE)', 'avgRate');
    qb.where('rating.bookID = :bookId AND rating.userId = :userId', {
      bookId,
      userId,
    });
    const result = await qb.getRawOne();
    return result.avgRate;
  }

  async getComments(bookId: number) {
    console.log('comments');
    const comments = await this.commentRepository.find({
      where: { book: bookId },
    });

    return comments;
  }
}
