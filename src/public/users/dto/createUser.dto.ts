import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class CreateUserDto extends Dto<CreateUserDto> {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string;
}
