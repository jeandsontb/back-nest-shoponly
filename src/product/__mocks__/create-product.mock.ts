import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDto } from '../dto/create-product.dto';

export const createProductMock: CreateProductDto = {
  categoryId: categoryMock.id,
  image: 'image mock',
  name: 'name mock',
  price: 25.0,
};
