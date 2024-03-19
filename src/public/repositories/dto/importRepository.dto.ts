import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Dto } from 'src/lib/dto/Dto';

export class RepositoryDetailsDto extends Dto<RepositoryDetailsDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  owner: string;
}

export class ImportRepositoryDto extends Dto<ImportRepositoryDto> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({ type: RepositoryDetailsDto, isArray: true })
  repositories: RepositoryDetailsDto[];
}

export class ImportRepositoryExtendedDto extends ImportRepositoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}
