import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';
import { AuthUserDto } from 'src/public/users/dto/authUser.dto';

export class LoginResDto extends Dto<LoginResDto> {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}
