import { Injectable } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    return category;
  }

  async create(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name });
    await category.save();
    return category;
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }
}
