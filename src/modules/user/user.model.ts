import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, strict: true, versionKey: false })
export class User {
  @Prop({ type: String, required: true })
  /** The Google OAuth user ID to identify this user. */
  id: string;

  @Prop({ type: String, required: true })
  /** The user's full name. */
  name: string;

  @Prop({ type: String, required: true })
  /** The user's email address. */
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
