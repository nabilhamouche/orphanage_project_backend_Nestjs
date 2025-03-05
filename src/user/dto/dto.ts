import { IsEmail, IsNotEmpty, IsString,IsOptional,IsEnum,IsUUID,ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@prisma/client';

export class UserDto {
    @IsEmail()
    email: string;

    @IsString()
    // @MinLength(6)
    password: string;

    @IsEnum(Role)
    role: Role;
}
export class OrphanageDto {
    @IsOptional()
    @IsUUID()
    id?: string; 

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsUUID()
    userId: string;
}
export class UserDtoOrphanage {
    @ValidateNested()
    @Type(() => UserDto)
    user:UserDto;
    @IsOptional()
    @ValidateNested()
    @Type(() => OrphanageDto)
    orphanage?: OrphanageDto;
}