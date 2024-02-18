import { User } from '@prisma/client';

export type UserWithoutPasswordDto = Omit<User, 'hash'>;
