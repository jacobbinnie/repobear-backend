import { Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';
import { AuthUserDto } from './dto/authUser.dto';

@ApiTags('users')
@Controller('user')
export class UsersController {
  logger: Logger;

  constructor(private readonly usersService: UsersService) {
    this.logger = new Logger();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('user')
  async getUser(@ReqUser() user: ReqUserType): Promise<AuthUserDto> {
    return this.usersService.getUser(user.userId.id);
  }
}
