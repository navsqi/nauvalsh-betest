import { IsEmail, IsOptional, IsString, Length, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public emailAddress?: string;

  @IsString()
  public password?: string;

  @IsString()
  public userName?: string;

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

export class GetUsersDto {
  @IsEmail()
  @IsOptional()
  public emailAddress?: string;

  @IsString()
  @IsOptional()
  public userName?: string;

  @IsString()
  @IsOptional()
  public accountNumber?: string;

  @IsString()
  @Length(16, 16)
  @IsOptional()
  public identityNumber?: string;
}
