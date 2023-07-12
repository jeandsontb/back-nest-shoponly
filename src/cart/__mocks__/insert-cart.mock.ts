import { productMock } from '../../product/__mocks__/product.mock';
import { InsertCardDto } from '../dto/insert-cart.dto';

export const insertCartMock: InsertCardDto = {
  amount: 232,
  productId: productMock.id,
};
