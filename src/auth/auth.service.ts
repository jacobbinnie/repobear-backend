import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/public/users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/public/users/dto/createUser.dto';
import { AuthUserDto } from 'src/public/users/dto/authUser.dto';
import { LoginResDto } from './dto/loginRes.dto';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    const authUser = new AuthUserDto({
      id: user.id,
      email: user.email,
    });

    return new LoginResDto({
      user: { ...authUser },
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '60d',
      }),
    });
  }

  async createUser(data: CreateUserDto) {
    const user = await this.userService.create(data);

    if (user.id) {
      return this.login(user);
    }
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getGithubAccessToken(code: string) {
    const res = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (res.data.includes('error')) {
      throw new UnauthorizedException();
    }

    let [, access_token] = res.data.split('=');
    // remove &scope from the end
    access_token = access_token.split('&')[0];

    if (!access_token) {
      throw new UnauthorizedException();
    }

    return access_token;
  }
}
