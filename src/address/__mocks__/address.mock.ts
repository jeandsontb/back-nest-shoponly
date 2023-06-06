import { userEntityMock } from '../../user/__mocks__/user.mock';
import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entity/address.entity';

export const addressMock: AddressEntity = {
  cep: '22563666',
  cityId: cityMock.id,
  complement: 'complement mock',
  createdAt: new Date(),
  id: 2568,
  numberAddress: 586,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
