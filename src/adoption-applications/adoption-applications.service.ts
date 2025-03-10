import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdoptionApplicationDto, UpdateAdoptionApplicationDto } from './dto';

@Injectable()
export class AdoptionApplicationsService {
    constructor(private prisma:PrismaService){}
    async create(createAdoptionApplicationDto: CreateAdoptionApplicationDto, adopterId: string) {
        return this.prisma.adoptionApplication.create({
          data: {
            ...createAdoptionApplicationDto,
            adopterId,
          },
        });
      }
    
      async findAll() {
        return this.prisma.adoptionApplication.findMany({
          include: {
            orphanage: true,
            adopter: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
      }
    async findAllByOrphanage(orphanageId: string){
        return this.prisma.adoptionApplication.findMany({
          where: { orphanageId },
          include: {
            orphanage: true,
            adopter: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            },
        });
    }
      async findOne(id: string) {
        const application = await this.prisma.adoptionApplication.findUnique({
          where: { id },
          include: {
            orphanage: true,
            adopter: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });
    
        if (!application) {
          throw new NotFoundException(`Adoption application with ID ${id} not found`);
        }
    
        return application;
      }
    
      async update(id: string, updateAdoptionApplicationDto: UpdateAdoptionApplicationDto) {
        return this.prisma.adoptionApplication.update({
          where: { id },
          data: updateAdoptionApplicationDto,
        });
      }
}
