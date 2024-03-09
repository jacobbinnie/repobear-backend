import { Controller } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('repositories')
@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}
}
