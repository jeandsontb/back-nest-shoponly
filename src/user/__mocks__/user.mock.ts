import { UserEntity } from '../entity/user.entity';
import { UserTypeRole } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '25635625478',
  createdAt: new Date(),
  email: 'emailmock@mock.com',
  id: 564,
  name: 'nameMock',
  password: 'passwordMock',
  phone: 'phoneMock',
  typeUser: UserTypeRole.User,
  updatedAt: new Date(),
};
