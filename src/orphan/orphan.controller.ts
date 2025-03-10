import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrphanService } from './orphan.service';
import { CreateOrphanDto, UpdateOrphanDto } from './dto';
import { ApiBearerAuth,ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
@ApiTags('orphan')
@Controller('orphan')
export class OrphanController {
    constructor(private orphanservice : OrphanService){}

    @Post()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new orphan' })
    @Roles("Owner_ORPHANAGE")
    async createOrphan(@Body() createOrphanDto:CreateOrphanDto,@Req() req){
        return this.orphanservice.createOrphan(createOrphanDto,req.user.id);
    }
    
    @Get()
    @ApiOperation({ summary: 'Get all orphans' })
    async getOrphans(){
        return this.orphanservice.getOrphans();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an orphan by id' })
    async getOrphan(@Param('id') id:string){
        return this.orphanservice.getOrphan(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an orphan by id' })
    @Roles("Owner_ORPHANAGE")
    updateOrphan(@Param('id') id:string,@Body() updateOrphanDto:UpdateOrphanDto){
        return this.orphanservice.updateOrphan(id,updateOrphanDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'Delete an orphan by id'})
    @Roles("Owner_ORPHANAGE")
    deleteOrphan(@Param('id') id:string){
        return this.orphanservice.deleteOrphan(id);
    }
}
