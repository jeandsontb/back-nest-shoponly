import { ReadCategoryDto } from 'src/category/dto/head-category.dto';
import { ProductEntity } from '../entity/product.entity';

export class ReadProductDto {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: ReadCategoryDto;

  constructor(productEntity: ProductEntity) {
    (this.id = productEntity.id),
      (this.name = productEntity.name),
      (this.price = productEntity.price),
      (this.image = productEntity.image);
    this.category = productEntity.category
      ? new ReadCategoryDto(productEntity.category)
      : undefined;
  }
}
