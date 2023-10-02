import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { DeleteResult, ILike, In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CountProductDto } from './dto/count-product.dto';
import { Pagination, PaginationMeta } from '../dtos/pagination.dto';

const DEFAUL_PAGE_SIZE = 10;
const FISTT_PAGE = 1;

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
  ) {}

  async getAllPage(
    search?: string,
    size = DEFAUL_PAGE_SIZE,
    page = FISTT_PAGE,
  ): Promise<Pagination<ProductEntity[]>> {
    let findOptions = {};
    const skip = (page - 1) * size;

    if (search) {
      findOptions = {
        where: {
          name: ILike(`%${search}%`),
        },
      };
    }

    const [products, total] = await this.productRepository.findAndCount({
      ...findOptions,
      take: size,
      skip,
    });

    if (!products || products.length === 0) {
      throw new NotFoundException('Produto não encontrado');
    }

    return new Pagination(
      new PaginationMeta(
        Number(size),
        total,
        Number(page),
        Math.ceil(total / size),
      ),
      products,
    );
  }

  async getAll(
    productId?: number[],
    isGetRelations?: boolean,
  ): Promise<ProductEntity[]> {
    let findOptions = {};

    if (productId && productId.length > 0) {
      findOptions = {
        where: {
          id: In(productId),
        },
      };
    }

    if (isGetRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          category: true,
        },
      };
    }

    const products = await this.productRepository.find(findOptions);

    if (!products || products.length === 0) {
      throw new NotFoundException('Produto não encontrado');
    }

    return products;
  }

  async createProduct(createProduct: CreateProductDto): Promise<ProductEntity> {
    await this.categoryService.getCategoryById(createProduct.categoryId);

    return this.productRepository.save({
      ...createProduct,
    });
  }

  async getProductId(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async deleteProduct(idProduct: number): Promise<DeleteResult> {
    await this.getProductId(idProduct);
    return this.productRepository.delete({ id: idProduct });
  }

  async updateProduct(
    idProduct: number,
    updateProduct: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.getProductId(idProduct);

    return this.productRepository.save({
      ...product,
      ...updateProduct,
    });
  }

  async countProductsByCategoryId(): Promise<CountProductDto[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .select('product.category_id, COUNT(*) as total')
      .groupBy('product.category_id')
      .getRawMany();
  }
}
