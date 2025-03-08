import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { CreateUserDto } from './dto';
@Injectable()
export class UserService {
    constructor(protected prisma:PrismaService){}
    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
          where: { email: createUserDto.email },
        });
    
        if (existingUser) {
          throw new ConflictException('Email already exists');
        }
    
        const hashedPassword = await argon.hash(createUserDto.password);
    
        const { password, ...user } = await this.prisma.user.create({
          data: {
            ...createUserDto,
            password: hashedPassword,
          },
        });
    
        return user;
      }
    
      async findAll() {
        return this.prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      }
    
      async findOne(id: string) {
        return this.prisma.user.findUnique({
          where: { id },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });
      }
}

