import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { OrphanService } from './orphan.service';

@Controller('orphan')
export class OrphanController {
    constructor(private orphanservice : OrphanService){}

    @Post()
    createOrphan(){
        return this.orphanservice.createOrphan();
    }
    
    @Get()
    getOrphans(){
        return this.orphanservice.getOrphans();
    }

    @Get(':id')
    getOrphan(){
        return this.orphanservice.getOrphan();
    }

    @Put(':id')
    updateOrphan(){
        return this.orphanservice.updateOrphan();
    }

    @Delete(':id')
    deleteOrphan(){
        return this.orphanservice.deleteOrphan();
    }
}
