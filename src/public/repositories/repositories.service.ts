import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';
import { Endpoints } from '@octokit/types';

import { RepositoryOwnerDto } from './dto/repositoryOwner.dto';
import { GithubRepositoryDto } from './dto/githubRepository.dto';
import { ImportRepositoryExtendedDto } from './dto/importRepository.dto';
import { exec } from 'child_process';
import { promises as fsPromises } from 'fs';
import * as os from 'os';
import * as path from 'path';

type ListUserReposResponse = Endpoints['GET /user/repos']['response'];
type ListRepoKeysResponse =
  Endpoints['GET /repos/{owner}/{repo}/keys']['response'];
@Injectable()
export class RepositoriesService {
  constructor(private prisma: PrismaService) {}

  async getGithubUserRepositories(accessToken: string) {
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

  async generateSshKey({ email }: { email: string }): Promise<string> {
    const tempDir = os.tmpdir();
    const directoryPath = path.join(tempDir, 'keys');

    try {
      // Create the directory if it doesn't exist
      await fsPromises.mkdir(directoryPath, { recursive: true });

      // Set permissions for the directory
      await fsPromises.chmod(directoryPath, 0o700);
    } catch (error) {
      // Handle directory creation error
      console.error('Error creating directory:', error);
      throw error;
    }

    const command = `rm -rf ${directoryPath} && mkdir ${directoryPath} && ssh-keygen -t rsa -b 2048 -C ${email} -f "${directoryPath}/key" -N pass && chmod -R 700 ${directoryPath}`;

    await new Promise<string>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });

    const extractedKey = await fsPromises.readFile(`${directoryPath}/key.pub`, {
      encoding: 'utf-8',
    });

    return extractedKey;
  }

  async getDeployKeysForRepository({
    githubAccessToken,
    repository,
    repositoryOwner,
  }: {
    githubAccessToken: string;
    repository: string;
    repositoryOwner: string;
  }) {
    const res: ListRepoKeysResponse = await axios.get(
      `https://api.github.com/repos/${repositoryOwner}/${repository}/keys`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${githubAccessToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    return res.data;
  }

  async importGithubRepositories({
    accessToken,
    repositories,
    email,
  }: ImportRepositoryExtendedDto) {
    const deployKeys = [];

    for (const repo of repositories) {
      const existingDeployKeys = await this.getDeployKeysForRepository({
        githubAccessToken: accessToken,
        repository: repo.name,
        repositoryOwner: repo.owner,
      });

      console.log(existingDeployKeys);

      // console.log(`Generating SSH deploy key for ${repo}`);
      // const deployKey = await this.generateSshKey({
      //   email,
      // });
      // console.log(`Deploy key for ${repo}: ${deployKey}`);
      // deployKeys.push(deployKey);
    }

    return deployKeys;
  }
}
