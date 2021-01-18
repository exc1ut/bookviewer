import { CategoryResolver } from './category.resolver';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CategoryService, CategoryResolver],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
