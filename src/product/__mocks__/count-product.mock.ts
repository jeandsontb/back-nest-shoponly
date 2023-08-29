import { categoryMock } from '../../category/__mocks__/category.mock';
import { CountProductDto } from '../dto/count-product.dto';

export const countProductMock: CountProductDto = {
  category_id: categoryMock.id,
  total: 4,
};
