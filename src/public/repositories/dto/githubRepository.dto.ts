import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { RepositoryOwnerDto } from './repositoryOwner.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GithubRepositoryDto extends Dto<GithubRepositoryDto> {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  html_url: string;

  @IsString()
  @IsNotEmpty()
  default_branch: string;

  @IsString()
  @IsNotEmpty()
  clone_url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: RepositoryOwnerDto })
  owner: RepositoryOwnerDto;
}
