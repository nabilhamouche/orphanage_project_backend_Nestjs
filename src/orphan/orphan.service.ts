import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrphanDto, UpdateOrphanDto } from './dto';

@Injectable()
export class OrphanService {
    constructor(private prisma:PrismaService){}

    async createOrphan(createOrphanDto:CreateOrphanDto,orphanageId:string){
        return this.prisma.orphan.create({
            data:{...createOrphanDto,orphanageId,}
        });
    }
    
    async getOrphans(){
        return this.prisma.orphan.findMany({
            include:{orphanage:{
                select:{id:true,name:true}
            }}
        });
    }
    async getOrphan(id:string){
        const orphan = this.prisma.orphan.findUnique({
            where:{id},
            include:{orphanage:{
                select:{id:true,name:true}
            }}
        });
        if(!orphan){
            throw new NotFoundException('Orphan not found');
        }
        return orphan;
        }
    async updateOrphan(id:string,updateOrphanDto:UpdateOrphanDto){
        return this.prisma.orphan.update({
            where:{id},
            data:updateOrphanDto,
        });
    }
    async deleteOrphan(id:string){
        return this.prisma.orphan.delete({
            where:{id},
        });
    }
}
