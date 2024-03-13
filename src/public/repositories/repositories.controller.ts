import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRepositoriesDto } from './dto/userRepository.dto';

@ApiTags('repositories')
@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('getGithubUserRespositories')
  async getGithubUserRespositories(
    @Body() { accessToken }: { accessToken: string },
  ): Promise<UserRepositoriesDto> {
    return await this.repositoriesService.getGithubUserRespositories(
      accessToken,
    );
  }
}
