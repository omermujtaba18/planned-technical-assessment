import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupAuthDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
