import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductService } from '../product/product.service';
import { ReadCategoryDto } from './dto/head-category.dto';
import { CountProductDto } from 'src/product/dto/count-product.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  findAmountCategoryInProducts(
    category: CategoryEntity,
    countList: CountProductDto[],
  ): number {
    const count = countList.find((item) => item.category_id === category.id);

    if (count) {
      return count.total;
    }

    return 0;
  }

  async getAllCategories(): Promise<ReadCategoryDto[]> {
    const categories = await this.categoryRepository.find();

    const count = await this.productService.countProductsByCategoryId();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categoria vazia');
    }

    return categories.map(
      (category) =>
        new ReadCategoryDto(
          category,
          this.findAmountCategoryInProducts(category, count),
        ),
    );
  }

  async getCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  async getCategoryById(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  async createCategory(
    createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.getCategoryByName(createCategory.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Categoria ${String(
          category.name,
        ).toUpperCase()} já existe no sistema.`,
      );
    }

    return this.categoryRepository.save(createCategory);
  }
}
