import { UsersService } from '@/@modules/users/users.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserRequestDto } from '../users/dtos/create-user.dto';
import { SignInRequestDto } from './dtos/signin-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn({
    email,
    password,
  }: SignInRequestDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await bcrypt.compare(password, user.hash);

    if (!isValidPassword)
      throw new UnauthorizedException('Password or email is incorrect');

    return {
      accessToken: this.jwtService.sign(
        { sub: user.id, email: user.email },
        {
          expiresIn: '7d',
          secret: this.configService.get('JWT_SECRET'),
        },
      ),
    };
  }

  async signUp(createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }

  async getProfile(userId: string) {
    return this.usersService.findById(userId);
  }
}
