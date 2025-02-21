import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/models/users.model';
import { SignupAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        user.password = undefined;
        return user;
      }
    }

    return null;
  }

  async login(user: { id: number }) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async signup(user: SignupAuthDto) {
    let newUser = await this.usersService.findOneByEmail(user.email);

    if (newUser) {
      throw new BadRequestException(
        'Account with the provided email already exists',
      );
    }
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(user.password, saltOrRounds);

    newUser = await this.usersService.create({
      ...user,
      password: hashPassword,
    });

    const payload = { sub: newUser.id };
    newUser.password = undefined;

    return {
      access_token: this.jwtService.sign(payload),
      user: newUser,
    };
  }
}
