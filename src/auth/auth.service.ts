import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/app/users/dto/auth-credentials.dto';
import { User } from 'src/app/users/user.entity';
import { UsersService } from 'src/app/users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.usersService.createUser(authCredentialsDto);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);

    if (user && bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async login(user): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { username: user.username };

    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }
}
