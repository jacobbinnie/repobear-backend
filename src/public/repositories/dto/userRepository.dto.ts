import { Dto } from 'src/lib/dto/Dto';

export class UserRepositoryDto extends Dto<UserRepositoryDto> {
  id: number;
  name: string;
  description: string;
  html_url: string;
  default_branch: string;
  clone_url: string;
  owner: {
    id: number;
    login: string;
    html_url: string;
  };
}

export class UserRepositoriesDto extends Dto<UserRepositoryDto[]> {}
