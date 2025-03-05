import { IsEnum, IsEmail, IsNotEmpty, IsString,IsOptional } from "class-validator";
import { Role } from '@prisma/client';
export class Authdto{
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    
}
export class Registerdto_user{
    @IsEmail()
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    @IsString()
    password:string;
}
export class Registerdto_orphanage{
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsOptional()
    @IsString()
    address?:string;
    @IsOptional()
    @IsString()
    phone?:string;
}
export class Registerdto{
    @IsNotEmpty()
    @IsEnum(Role)
    role:Role;
    user:Registerdto_user;
    orphanage?:Registerdto_orphanage;
}
