import { userEntityMock } from '../../user/__mocks__/user.mock';
import { CartEntity } from '../entity/cart.entity';

export const cartMock: CartEntity = {
  id: 897689,
  active: true,
  createdAt: new Date(),
  updateAt: new Date(),
  userId: userEntityMock.id,
};
