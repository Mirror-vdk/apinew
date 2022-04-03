import { Controller, Post } from '@nestjs/common';

@Controller()
export class UsersController {
  @Post('create')
  async createUser(): Promise<any> {
    return 'Созданный пользователь';
  }
}
