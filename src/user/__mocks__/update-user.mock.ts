import { UpdatePasswordDto } from '../dto/updateUser.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  lastPassword: '@Novi123456',
  newPassword: '123asd',
};

export const updatePasswordInvalidMock: UpdatePasswordDto = {
  lastPassword: '4rete',
  newPassword: '89798789',
};
