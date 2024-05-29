import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/common/types/roles';

export const ROLES_KEY = 'roles';
export const ROLE = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
