import { ZodValidationPipe } from '@/@shared/pipes/zod-validation-pipe';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  CreateUserRequestDto,
  createUserSchema,
} from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { GetUserProperties } from './decorators';
import { SignInRequestDto, signInSchema } from './dtos/signin-auth.dto';
import { AtJwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UsePipes(new ZodValidationPipe(signInSchema))
  async signIn(@Body() singUserDto: SignInRequestDto) {
    const { accessToken } = await this.authService.signIn(singUserDto);
    return { accessToken };
  }

  @Post('sign-up')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserRequestDto) {
    return this.authService.signUp(createUserDto);
  }

  @Get('profile')
  @UseGuards(new AtJwtAuthGuard())
  async profile(@GetUserProperties('id') id: string) {
    return this.authService.getProfile(id);
  }
}
