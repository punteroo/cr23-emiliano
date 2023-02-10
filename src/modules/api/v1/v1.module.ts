import { Module } from '@nestjs/common';
import { ArtistExists } from 'src/custom/artist.exists.validator';
import { ArtistModule } from 'src/modules/artist/artist.module';
import { ConcertModule } from 'src/modules/concert/concert.module';
import { UserModule } from 'src/modules/user/user.module';
import { UserController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from 'src/modules/artist/artist.model';

@Module({
  imports: [
    UserModule,
    ConcertModule,
    ArtistModule,
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [UserController],
  providers: [ArtistExists],
})
export class V1Module {}
