import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserSessionDto {
  @IsString()
  @IsOptional()
  readonly _id?: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  /** The user's Google account ID. */
  readonly id: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  /** The user's Google account email. */
  readonly email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  /** The user's Google account name. */
  readonly name: string;

  @IsBoolean()
  @IsOptional()
  readonly admin?: boolean;
}
