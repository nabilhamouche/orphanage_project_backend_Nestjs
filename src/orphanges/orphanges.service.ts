import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrphanageDto, UpdateOrphanageDto } from './dto';

@Injectable()
export class OrphangesService {
    constructor(private prisma:PrismaService){}
    async create(createOrphanageDto:CreateOrphanageDto,ownerId:string){
        try{
        return this.prisma.orphanage.create({
         data:{...createOrphanageDto,ownerId,}
        })
    }catch(error){
        if(error.code === 'P2002'){
            throw new HttpException(
                'You can only own one orphanage.',
                HttpStatus.BAD_REQUEST,
              );
        }
        throw new HttpException(
            'Something went wrong',
            HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
    }

    async findAll(){
        return this.prisma.orphanage.findMany({
            include:{owner:{
                select:{id:true,name:true,email:true}
            }}
        })
    }
    async findOne(id:string){
        const orphanage= this.prisma.orphanage.findUnique({
            where:{id},
            include:{owner:{
                select:{id:true,name:true,email:true}
            }}
        })
        if(!orphanage){
            throw new NotFoundException('Orphanage not found')
        }
        return orphanage;
    }
    async update(id:string,updateOrphange:UpdateOrphanageDto){
        return this.prisma.orphanage.update({
            where:{id},
            data:updateOrphange,
        })
    }
    async remove(id:string){
        return this.prisma.orphanage.delete({
            where:{id},
        })
    }
}
