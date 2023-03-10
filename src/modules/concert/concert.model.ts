import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artist } from '../artist/artist.model';

/** Available scenarios. */
export enum ConcertScenario {
  NORTH = 'Norte',
  SOUTH = 'Sur',
  BOOMERANG = 'Boomerang',
  THE_BLUES_HOUSE = 'La Casita del Blues',
  MOUNTAIN = 'Montaña',
  PARAGUAY = 'Paraguay',
}

/** The day the concert is played (indistinct of its date) */
export enum ConcertDay {
  SATURDAY = 18,
  SUNDAY = 19,
}

@Schema({ strict: true, versionKey: false })
export class Concert extends Document {
  @Prop({ type: Types.ObjectId, ref: Artist.name })
  artist: Artist;

  @Prop({ enum: ConcertDay, required: false })
  day: ConcertDay;

  @Prop({ type: Date, required: true })
  startsAt: Date;

  @Prop({ type: Date, required: true })
  endsAt: Date;

  @Prop({ enum: ConcertScenario })
  scenario: ConcertScenario;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
