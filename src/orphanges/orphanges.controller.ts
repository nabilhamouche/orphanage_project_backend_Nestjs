import { Body, Controller, Delete, Get, Param, Post, Put ,Request, UseGuards} from '@nestjs/common';
import { OrphangesService } from './orphanges.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateOrphanageDto,UpdateOrphanageDto } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';

@ApiTags('Orphanges')
@Controller('orphanges')
export class OrphangesController {
    constructor(private orphangesService:OrphangesService){}

    @Post()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new orphanage' })
    @Roles("Owner_ORPHANAGE")
    async create(@Body() createOrphanageDto:CreateOrphanageDto,@Request() req){
        return this.orphangesService.create(createOrphanageDto,req.user.id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all orphanages' })
    async findall(){
        return this.orphangesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an orphanage by id' })
    async findOne(@Param('id') id:string){
        return this.orphangesService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an orphanage by id' })
    @Roles("Owner_ORPHANAGE")
    async update(@Param('id') id:string,@Body() updateOrphange:UpdateOrphanageDto){
        return this.orphangesService.update(id,updateOrphange);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'Delete an orphange by id'})
    @Roles("Owner_ORPHANAGE")
    async remove(@Param('id') id:string){
        return this.orphangesService.remove(id);
    }


}
