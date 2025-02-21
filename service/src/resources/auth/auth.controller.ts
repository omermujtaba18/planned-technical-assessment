import {
  Controller,
  Request as Req,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SkipJwtauth } from '../../common/decorators/skip-jwt-auth/skip-jwt-auth.decorator';
import { SignupAuthDto } from './dto/signup-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Log in a user
   *
   * @remarks This endpoint allows a user to login to their account.
   *
   * @throws {401} Unauthorized.
   */
  @SkipJwtauth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Req() req, @Body() loginDto: SigninAuthDto) {
    return this.authService.login(req.user);
  }

  /**
   * Sign up a new user
   *
   * @remarks This endpoint allows a user to sign up for a new account.
   * @throws {400} Bad request.
   */
  @SkipJwtauth()
  @Post('signup')
  async signup(@Body() signupDto: SignupAuthDto) {
    return this.authService.signup(signupDto);
  }
}
