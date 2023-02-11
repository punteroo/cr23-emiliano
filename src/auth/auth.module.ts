import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { secret } from '../../config.json';
import { JwtStrategy } from './auth.strategy';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn: '30m',
        algorithm: 'HS512',
      },
    }),
    UserModule,
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
