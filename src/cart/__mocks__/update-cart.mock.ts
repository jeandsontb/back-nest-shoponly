import { productMock } from '../../product/__mocks__/product.mock';
import { UpdateCartDto } from '../dto/update-cart.dto';

export const updateCartMock: UpdateCartDto = {
  amount: 588,
  productId: productMock.id,
};
