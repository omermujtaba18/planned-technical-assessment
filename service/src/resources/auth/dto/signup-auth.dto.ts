import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupAuthDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Password must be at least 10 characters long' })
  password: string;
}
