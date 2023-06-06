import { UserEntity } from '../entity/user.entity';
import { UserTypeRole } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '25635625478',
  createdAt: new Date(),
  email: 'emailmock@mock.com',
  id: 564,
  name: 'nameMock',
  password: '$2b$10$lFaQnrVVjpgiEZb05C2rO.4WZLps/MvtYU1CGuenxFgEkBfgsb3xa',
  phone: 'phoneMock',
  typeUser: UserTypeRole.User,
  updatedAt: new Date(),
};
