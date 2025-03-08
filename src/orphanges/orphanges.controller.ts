import { Body, Controller, Delete, Get, Param, Post, Put ,Request, UseGuards} from '@nestjs/common';
import { OrphangesService } from './orphanges.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateOrphanageDto,UpdateOrphanageDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guard';

@ApiTags('Orphanges')
@Controller('orphanges')
export class OrphangesController {
    constructor(private orphangesService:OrphangesService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new orphanage' })
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an orphanage by id' })
    async update(@Param('id') id:string,@Body() updateOrphange:UpdateOrphanageDto){
        return this.orphangesService.update(id,updateOrphange);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'Delete an orphange by id'})
    async remove(@Param('id') id:string){
        return this.orphangesService.remove(id);
    }


}
