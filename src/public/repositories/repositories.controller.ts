import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GithubRepositoryDto } from './dto/githubRepository.dto';
import { ImportRepositoryDto } from './dto/importRepository.dto';
import { ReqUser, ReqUserType } from 'src/auth/util/user.decorator';

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
    return await this.repositoriesService.getGithubUserRepositories(
      accessToken,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('importGithubRepositories')
  async importGithubRepositories(
    @ReqUser() user: ReqUserType,
    @Body()
    { accessToken, repositories }: ImportRepositoryDto,
  ): Promise<string[]> {
    return await this.repositoriesService.importGithubRepositories({
      accessToken,
      repositories,
      email: user.username,
    });
  }
}
