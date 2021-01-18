import { CategoryService } from './category.service';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Category } from 'src/entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async getCategories() {
    return this.categoryService.getAll();
  }

  @Mutation(() => Category)
  async createCategory(@Args('name') name: string) {
    return this.categoryService.create(name);
  }
}
