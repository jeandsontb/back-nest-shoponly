import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { UserTypeRole } from 'src/user/enum/user-type.enum';
import { ReadProductDto } from './dto/read-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Roles(UserTypeRole.Admin, UserTypeRole.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<ReadProductDto[]> {
    return (await this.productService.getAll()).map(
      (product) => new ReadProductDto(product),
    );
  }

  @Roles(UserTypeRole.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createProduct(
    @Body()
    createProduct: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }
}
