import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';
import { Endpoints } from '@octokit/types';

import { RepositoryOwnerDto } from './dto/repositoryOwner.dto';
import { GithubRepositoryDto } from './dto/githubRepository.dto';
import { ImportRepositoryDto } from './dto/importRepository.dto';

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

    return res.data.map((repo) => {
      return new GithubRepositoryDto({
        id: repo.id,
        name: repo.name,
        clone_url: repo.clone_url,
        description: repo.description,
        default_branch: repo.default_branch,
        html_url: repo.html_url,
        owner: new RepositoryOwnerDto({
          id: repo.owner.id,
          login: repo.owner.login,
          html_url: repo.owner.html_url,
        }),
      });
    });
  }

  async importGithubRepositories({
    accessToken,
    repositories,
  }: ImportRepositoryDto) {
    repositories.forEach(async (repo) => {
      console.log(`Generating SSH deploy key for ${repo}`);
    });
    // generate SSH deploy key per repository
    // add deploy key to repository
    // clone repository
    // add repository to user
  }
}
