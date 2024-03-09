import { Module } from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { BucketsController } from './buckets.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BucketsController],
  providers: [BucketsService, PrismaService],
})
export class BucketsModule {}
