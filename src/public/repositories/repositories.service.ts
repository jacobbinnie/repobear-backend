import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';
import { Endpoints } from '@octokit/types';
import { UserRepositoryDto } from './dto/userRepository.dto';

type ListUserReposResponse = Endpoints['GET /user/repos']['response'];
@Injectable()
export class RepositoriesService {
  constructor(private prisma: PrismaService) {}

  async getGithubUserRespositories(accessToken: string) {
    const res: ListUserReposResponse = await axios.get(
      `https://api.github.com/user/repos`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${accessToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    const data = res.data.map((repo) => {
      return new UserRepositoryDto({
        id: repo.id,
        name: repo.name,
        clone_url: repo.clone_url,
        description: repo.description,
        default_branch: repo.default_branch,
        html_url: repo.html_url,
        owner: {
          id: repo.owner.id,
          login: repo.owner.login,
          html_url: repo.owner.html_url,
        },
      });
    });

    return data;
  }
}
