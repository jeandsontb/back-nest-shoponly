import { SetMetadata } from '@nestjs/common';
import { UserTypeRole } from '../user/enum/user-type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypeRole[]) =>
  SetMetadata(ROLES_KEY, roles);
