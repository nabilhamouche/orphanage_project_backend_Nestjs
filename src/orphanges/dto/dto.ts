import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty,PartialType } from '@nestjs/swagger';

export class CreateOrphanageDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  location: string;

}

export class UpdateOrphanageDto extends PartialType(CreateOrphanageDto) {}