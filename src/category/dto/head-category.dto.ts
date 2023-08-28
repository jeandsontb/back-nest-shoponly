import { CategoryEntity } from '../entity/category.entity';

export class ReadCategoryDto {
  id: number;
  name: string;
  amountProducts?: number;

  constructor(categoryEntity: CategoryEntity, amountProducts?: number) {
    (this.id = categoryEntity.id),
      (this.name = categoryEntity.name),
      (this.amountProducts = amountProducts);
  }
}
