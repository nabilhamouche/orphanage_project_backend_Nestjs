import { IsEnum ,IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '@prisma/client';

export class CreateAdoptionApplicationDto {
    @ApiProperty()
    @IsString()
    orphanageId: string;
  }

  export class UpdateAdoptionApplicationDto {
    @ApiProperty({ enum: ApplicationStatus })
    @IsEnum(ApplicationStatus)
    status: ApplicationStatus;
  }