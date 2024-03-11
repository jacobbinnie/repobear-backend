import { Controller, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
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
  @Post(':id')
  async getUserById(@Param('id') id: string): Promise<AuthUserDto> {
    return this.usersService.getUser(id);
  }
}
