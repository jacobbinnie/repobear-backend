import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthUserDto } from './dto/authUser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: string) {
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new AuthUserDto({
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
    });
  }

  async findOneWithEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        username: data.username,
        avatar: data.avatar,
      },
    });
  }
}
