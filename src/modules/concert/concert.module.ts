import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Concert, ConcertSchema } from './concert.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }]),
  ],
  providers: [ConcertService],
  exports: [ConcertService],
})
export class ConcertModule {}
