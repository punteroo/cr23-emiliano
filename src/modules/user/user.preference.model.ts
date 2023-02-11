import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Concert } from '../concert/concert.model';
import { User } from './user.model';

@Schema({ versionKey: false, strict: true })
export class UserPreference extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  /** The user this preference belongs to. */
  user: User;

  @Prop({ type: Types.ObjectId, ref: Concert.name, required: true })
  /** The concert this preference points to. */
  concert: Concert;

  @Prop({ type: Boolean, default: false, required: true })
  /** Wether the user wants to know about this concert or not. */
  preferred: boolean;
}

export const UserPreferenceSchema =
  SchemaFactory.createForClass(UserPreference);
