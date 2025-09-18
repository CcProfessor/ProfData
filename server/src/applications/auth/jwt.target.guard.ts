import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TargetJwtGuard extends AuthGuard('target-jwt') {}
