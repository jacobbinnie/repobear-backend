import { Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RepositoriesController],
  providers: [RepositoriesService, PrismaService],
})
export class RepositoriesModule {}
