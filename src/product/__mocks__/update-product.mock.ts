import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDto } from '../dto/update-product.dto';

export const updateProductMock: UpdateProductDto = {
  categoryId: categoryMock.id,
  image: 'image mock',
  name: 'name mock',
  price: 25.0,
};
