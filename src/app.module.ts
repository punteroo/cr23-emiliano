import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoDb } from '../config.json';
import { APIModule } from './modules/api/api.module';

@Module({
  imports: [MongooseModule.forRoot(mongoDb), APIModule],
})
export class AppModule {}
