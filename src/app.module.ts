import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { mongoDb } from '../config.json';

@Module({
  imports: [MongooseModule.forRoot(mongoDb)],
  providers: [AppService],
})
export class AppModule {}
