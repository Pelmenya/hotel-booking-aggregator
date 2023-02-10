import { SetMetadata } from '@nestjs/common';
import { TRole } from 'src/modules/users/types/t-role';

export const Roles = (...roles: TRole[]) => SetMetadata('roles', roles);
