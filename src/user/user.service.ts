import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDtoOrphanage,OrphanageDto} from './dto';
@Injectable()
export class UserService {
    constructor(protected Prisma:PrismaService){}

}
// ############################################################################################################
@Injectable()
export class orphanageService extends UserService{
    constructor(Prisma:PrismaService){
        super(Prisma);
    }

    async updateOrphanage(userId: string, data: OrphanageDto) {
        return await this.Prisma.orphanage.update({
            where: { userId },
            data,
        });
    }

    async deleteOrphanageByUserId(userId: string) {
        return await this.Prisma.orphanage.delete({ where: { userId } });
    }
}
// ############################################################################################################
@Injectable()
export class AdminService extends UserService{
    constructor(private prisma:PrismaService,private readonly orphanageService: orphanageService){
        super(prisma);
    }
// Create a user (handles orphanages too)
async createUser(data: UserDtoOrphanage) {
    const user = await this.prisma.user.create({ 
        data: data.user 
    });

    // If role is ORPHANAGE, create an orphanage entry
    if (user.role === 'ORPHANAGE' && data.orphanage) {
        await this.prisma.orphanage.create({
            data: {
                name: data.orphanage.name,
                address: data.orphanage.address || '',
                phone: data.orphanage.phone || '',
                user: {
                    connect: { id: user.id } 
                }
            }
        });
    }

    return user;
}

// Get a user by ID (include orphanage details if applicable)
async getUser(id: string) {
    return await this.prisma.user.findUnique({
        where: { id },
        include: { orphanage: true },
    });
}

// Get all users (include orphanages if applicable)
async getUsers() {
    return await this.prisma.user.findMany({
        include: { orphanage: true },
    });
}

// Update a user (handles orphanage updates)
async updateUser(id: string, data: UserDtoOrphanage) {
    const updatedUser = await this.prisma.user.update({
        where: { id },
        data: data.user, 
    });

    // If role is ORPHANAGE, update orphanage details
    if (data.user.role === 'ORPHANAGE' && data.orphanage) {
        if (!data.orphanage.id) {
            throw new Error("Orphanage ID is required for updates.");
        }
        await this.orphanageService.updateOrphanage(data.orphanage.id , data.orphanage);
    }

    return updatedUser;
}

// Delete a user (also delete orphanage if applicable)
async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    // If user is an orphanage admin, delete orphanage first
    if (user?.role === 'ORPHANAGE') {
        await this.orphanageService.deleteOrphanageByUserId(id);
    }

    return await this.prisma.user.delete({ where: { id } });
}
}