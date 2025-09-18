import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TargetJwtGuard extends AuthGuard('target-jwt') {
canActivate(context: ExecutionContext) {
    return super.canActivate(context); // mantém o fluxo padrão
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Token inválido ou ausente');
    }
    return user;
  }
}
