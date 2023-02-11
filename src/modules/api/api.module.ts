import { Module } from '@nestjs/common';
import { V1Module } from './v1/v1.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, V1Module],
})
export class APIModule {}
