import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { UserTypeRole } from 'src/user/enum/user-type.enum';
import { ReadProductDto } from './dto/read-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

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

  @Roles(UserTypeRole.Admin)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }

  @Roles(UserTypeRole.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:productId')
  async updateProduct(
    @Param('productId') productId: number,
    @Body() updateProduct: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(productId, updateProduct);
  }
}
