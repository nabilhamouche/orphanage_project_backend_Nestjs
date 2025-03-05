import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { Authdto, Registerdto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService,private JwtService:JwtService,private config:ConfigService){}
    async register(dto:Registerdto){
        try{
            const hashedPassword=await argon.hash(dto.user.password);
            const user=await this.prisma.user.create({
                data: {
                    email: dto.user.email,
                    password: hashedPassword,
                    role: dto.role as Role,
                },
            })
            if(dto.role===Role.ORPHANAGE && user && dto.orphanage ){
                await this.prisma.orphanage.create({
                    data:{
                        name:dto.orphanage.name,
                        address:dto.orphanage.address || '',
                        phone:dto.orphanage.phone || '',
                        user:{
                            connect:{
                                id:user.id,
                            }
                            },
                        }, 
                })
            }
            return this.genrateToken(user.id,user.email,user.role);
        }
        catch(error){
            throw new ForbiddenException('Registration failed');
         }
    }
    async log_in(dto:Authdto){
        try{
            const user= await this.prisma.user.findUnique({
                where:{
                    email:dto.email
                },
            });
            if(!user){
                throw new ForbiddenException('invalid credentials'); 
            }
            const isPasswordValid=await argon.verify(user.password,dto.password);
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
        const token=await this.JwtService.signAsync(payload,{
            secret:this.config.get('JWT_SECRET'),
            expiresIn: '7d',
        });
        return{
            access_token:token,
        };
    }
}
