import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString,IsDateString,IsEnum } from "class-validator";
import {AdoptionStatus} from '@prisma/client'
export class CreateOrphanDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ example: 7 })
    @IsNumber()
    age: number;

    @ApiProperty()
    @IsEnum(['Male', 'Female'], { message: 'Gender must be either Male or Female' })
    gender: string;

    @ApiProperty()
    @IsDateString()
    dateOfBirth: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    healthStatus?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    specialNeeds?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    bio?: string;
    @IsEnum(AdoptionStatus)
    @ApiProperty()
    @IsOptional()
    adoptionStatus?:string;
}