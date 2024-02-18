import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthConstants } from '../constants';

@Injectable()
export class AtJwtAuthGuard extends AuthGuard(AuthConstants.AT_JWT_KEY) {}
