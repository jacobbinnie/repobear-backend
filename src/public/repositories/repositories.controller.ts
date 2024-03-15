import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GithubRepositoryDto } from './dto/githubRepository.dto';
import { ImportRepositoryDto } from './dto/importRepository.dto';
import { UserRepositoryDto } from './dto/userRepository.dto';

@ApiTags('repositories')
@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('getGithubUserRespositories')
  async getGithubUserRespositories(
    @Body() { accessToken }: { accessToken: string },
  ): Promise<GithubRepositoryDto[]> {
    return await this.repositoriesService.getGithubUserRespositories(
      accessToken,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('importGithubRepositories')
  async importGithubRepositories(
    @Body()
    { accessToken, repositories }: ImportRepositoryDto,
  ): Promise<any> {
    return await this.repositoriesService.importGithubRepositories({
      accessToken,
      repositories,
    });
  }
}
