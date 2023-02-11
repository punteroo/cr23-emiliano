import { IsObject, ValidateNested } from 'class-validator';
import { UserSessionDto } from './user.session.dto';
import { UserPreference } from 'src/modules/user/user.preference.model';
import { Type } from 'class-transformer';

export class UserDto extends UserSessionDto {
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => UserPreference)
  readonly preferences: UserPreference[];
}
