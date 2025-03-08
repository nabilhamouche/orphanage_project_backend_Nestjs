import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { LoginDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService,private JwtService:JwtService,private config:ConfigService){}
    async login(LoginDto:LoginDto){
        try{
            const user= await this.prisma.user.findUnique({
                where:{
                    email:LoginDto.email
                },
            });
            if(!user){
                throw new ForbiddenException('invalid credentials'); 
            }
            const isPasswordValid=await argon.verify(user.password,LoginDto.password);
            if(!isPasswordValid){
                throw new ForbiddenException('invalid credentials');
            }
            return this.genrateToken(user.id,user.email,user.role);
        }
        catch(error){
            throw new ForbiddenException('Login failed');
        }
    }
    private async genrateToken(userid:string,email:string,role:string){
        const payload={sub:userid,email,role};
        const token=await this.JwtService.signAsync(payload);
        return{
            access_token:token,
        };
    }
}
