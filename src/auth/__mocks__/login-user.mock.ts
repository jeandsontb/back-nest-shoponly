import { userEntityMock } from '../../user/__mocks__/user.mock';
import { LoginDto } from '../dto/login.dto';

export const loginMock: LoginDto = {
  email: userEntityMock.email,
  password: '@Novi123456',
};
