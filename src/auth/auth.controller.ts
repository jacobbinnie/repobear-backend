import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/public/users/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/public/users/dto/createUser.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth';
import { JwtGuard } from './guards/jwt-auth.guard';
import { LoginResDto } from './dto/loginRes.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResDto> {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('getGithubAccessToken')
  async getGithubAccessToken(@Body() { code }: { code: string }) {
    return await this.authService.getGithubAccessToken(code);
  }
}
