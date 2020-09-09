import { CategoryResolver } from './category.resolver';
import { CategorySchema } from '../schemas/category.schema';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category } from 'src/schemas/category.schema';

@Module({
  providers: [CategoryService, CategoryResolver],
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
})
export class CategoryModule {}
