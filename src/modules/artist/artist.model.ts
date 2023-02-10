import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, strict: true })
export class Artist extends Document {
  @Prop({ type: String, required: true })
  /** The bands' name. */
  name: string;

  @Prop({ type: String })
  /** A representative image URL for this band. */
  image: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
