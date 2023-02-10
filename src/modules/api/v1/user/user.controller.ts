import { Controller } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Controller(`api/v1/user`)
export class UserController {
  constructor(private readonly service: UserService) {}
}
