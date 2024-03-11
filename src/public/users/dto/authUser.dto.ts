import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class AuthUserDto extends Dto<AuthUserDto> {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;
}
