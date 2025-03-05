import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AdminService, UserService } from './user.service';
import { UserDtoOrphanage } from './dto';

@Controller('user')
export class UserController {
    constructor(private UserService:UserService,private AdminService:AdminService){}
    // Admin stuff
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.AdminService.getUser(id);
    }

    @Get()
    getUsers() {
        return this.AdminService.getUsers();
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.AdminService.deleteUser(id);
    }
}
