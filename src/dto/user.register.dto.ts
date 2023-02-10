import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;
}
