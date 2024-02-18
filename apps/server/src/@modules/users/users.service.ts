import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dtos/create-user.dto';

import { DatabaseService } from '@/@modules/database/database.service';
import { UserWithoutPasswordDto } from './dtos/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create({
    email,
    name,
    password,
  }: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const hash = await bcrypt.hash(password, 8);

    // check if user with email already exists
    const foundedUser = await this.database.user.findFirst({
      where: {
        email,
      },
    });

    if (foundedUser)
      throw new ConflictException('User with this email already exists');

    const rawUser = await this.database.user.create({
      data: {
        email,
        hash,
        name: name,
        isActive: true,
      },
    });

    return {
      id: rawUser.id,
      email: rawUser.email,
      name: rawUser.name,
      isActive: rawUser.isActive,
      createdAt: rawUser.createdAt,
      updatedAt: rawUser.updatedAt,
    };
  }

  async findById(id: string): Promise<UserWithoutPasswordDto> {
    const rawUser = await this.database.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return {
      id: rawUser.id,
      email: rawUser.email,
      name: rawUser.name,
      isActive: rawUser.isActive,
      createdAt: rawUser.createdAt,
      updatedAt: rawUser.updatedAt,
    };
  }

  async findByEmail(email: string): Promise<User> {
    const rawUser = await this.database.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    return {
      id: rawUser.id,
      email: rawUser.email,
      name: rawUser.name,
      hash: rawUser.hash,
      isActive: rawUser.isActive,
      createdAt: rawUser.createdAt,
      updatedAt: rawUser.updatedAt,
    };
  }

  async findManyByEmail(email: string): Promise<UserWithoutPasswordDto[]> {
    const rawUsers = await this.database.user.findMany({
      where: {
        email: {
          contains: email,
        },
      },
    });

    return rawUsers.map((rawUser) => ({
      id: rawUser.id,
      email: rawUser.email,
      name: rawUser.name,
      isActive: rawUser.isActive,
      createdAt: rawUser.createdAt,
      updatedAt: rawUser.updatedAt,
    }));
  }
}
