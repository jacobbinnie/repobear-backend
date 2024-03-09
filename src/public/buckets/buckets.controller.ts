import { Controller } from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('buckets')
@Controller('buckets')
export class BucketsController {
  constructor(private readonly bucketsService: BucketsService) {}
}
