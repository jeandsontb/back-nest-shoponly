import { userEntityMock } from '../../user/__mocks__/user.mock';
import { ReadLoginDto } from '../dto/readLogin.dto';
import { jwtMock } from './jwt.mocks';

export const returnLoginMock: ReadLoginDto = {
  accessToken: jwtMock,
  user: userEntityMock,
};
