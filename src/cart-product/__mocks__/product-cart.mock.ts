import { cartMock } from '../../cart/__mocks__/cart.mock';
import { CartProductEntity } from '../entity/cart-product.entity';
import { productMock } from '../../product/__mocks__/product.mock';

export const cartProductMock: CartProductEntity = {
  id: 223,
  productId: productMock.id,
  amount: 5435,
  cartId: cartMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
