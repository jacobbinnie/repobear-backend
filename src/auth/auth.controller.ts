import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/public/users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   return await this.authService.login(req.user);
  // }

  // @Post('register')
  // async registerUser(@Body() createUserDto: CreateUserDto) {
  //   return await this.authService.createUser(createUserDto);
  // }

  // @UseGuards(RefreshJwtGuard)
  // @Post('refresh')
  // async refreshToken(@Request() req) {
  //   return await this.authService.refreshToken(req.user);
  // }

  @Post('getGithubAccessToken')
  async getGithubAccessToken(@Body() { code }: { code: string }) {
    return await this.authService.getGithubAccessToken(code);
  }
}
