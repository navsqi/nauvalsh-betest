import { IsEmail, IsString, Length, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public emailAddress: string;

  @IsString()
  public password: string;

  @IsString()
  public userName: string;

  @IsString()
  @Length(16, 16)
  public identityNumber?: string;
}

export class LoginDto {
  @IsEmail()
  @ValidateIf(o => !o.userName || o.emailAddress)
  public emailAddress?: string;

  @IsString()
  public password: string;

  @IsString()
  @ValidateIf(o => !o.emailAddress || o.userName)
  public userName?: string;
}
