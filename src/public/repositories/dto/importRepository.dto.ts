import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class ImportRepositoryDto extends Dto<ImportRepositoryDto> {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({ type: String, isArray: true })
  @IsString()
  @IsNotEmpty()
  repositories: string[];
}
