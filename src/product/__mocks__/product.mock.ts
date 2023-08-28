import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entity/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  id: 4587,
  image: 'http://image.com',
  name: 'name product mock',
  price: 34.3,
  updatedAt: new Date(),
};
