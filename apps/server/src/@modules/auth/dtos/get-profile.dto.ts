import { UserWithoutPasswordDto } from '@/@modules/users/dtos/get-user.dto';
import { Subscription } from '@prisma/client';

export type GetProfileResponseDto = UserWithoutPasswordDto & {
  subscription: Subscription;
};
