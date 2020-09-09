import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    return category;
  }

  async create(name: string): Promise<Category> {
    const category = new this.categoryModel({ name });
    await category.save();
    return category;
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryModel.find();

    return categories;
  }
}
