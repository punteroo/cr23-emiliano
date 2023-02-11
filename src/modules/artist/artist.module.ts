import { Module } from '@nestjs/common';
import { Artist, ArtistSchema } from './artist.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
