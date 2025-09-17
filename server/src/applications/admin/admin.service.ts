import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  test() {
    return 'A rota Admin ta funcionando! E o Service tbm';
  }
}
