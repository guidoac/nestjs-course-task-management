import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/app/users/dto/auth-credentials.dto';
import { User } from 'src/app/users/user.entity';
import { UsersService } from 'src/app/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.usersService.createUser(authCredentialsDto);
  }

  async validateUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User | null> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersService.findOne(username);

    if (user && bcrypt.compare(password, user.password)) {
      const result: User = user;

      return result;
    }

    return null;
  }
}
