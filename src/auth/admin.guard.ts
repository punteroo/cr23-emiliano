import {
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { UserDto } from 'src/dto/user.dto';

export class JwtAdminGuard implements CanActivate {
  constructor(private readonly user: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    // Get the user from the request.
    const user: UserDto = ctx.getRequest().user;

    // Is the user an admin?
    if (!user.admin)
      // Reject this login attempt.
      throw new UnauthorizedException();

    return true;
  }
}
