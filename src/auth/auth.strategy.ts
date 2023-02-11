import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { secret } from '../../config.json';

import { UserSessionDto } from 'src/dto/user.session.dto';
import { User } from 'src/modules/user/user.model';
import { UserRegisterDto } from 'src/dto/user.register.dto';
import { UserService } from 'src/modules/user/user.service';
import { UserDto } from 'src/dto/user.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly user: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      algorithms: ['HS512'],
    });
  }

  @UsePipes(ValidationPipe)
  async validate(payload: UserSessionDto): Promise<UserDto> {
    // Does the user exist?
    let user: UserDto = await this.user.getUserById(payload.id);

    // Validate for administrative privileges.
    if (payload.admin) {
      // Is the user an admin?
      if (!user.admin)
        // Reject this login attempt.
        throw new UnauthorizedException('You are not an admin.');
    }

    if (!user)
      // Register the user.
      user = {
        ...(await this.user.registerUser(payload as UserRegisterDto)),
        preferences: [],
      } as UserDto;

    return user;
  }
}
