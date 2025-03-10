import { Controller, Get, Post, UseGuards ,Body,Request,Put,Param, Req} from '@nestjs/common';
import { AdoptionApplicationsService } from './adoption-applications.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { CreateAdoptionApplicationDto, UpdateAdoptionApplicationDto } from './dto';
import { Roles } from 'src/auth/decorator';

@ApiTags('adoption-applications')
@Controller('adoption-applications')
export class AdoptionApplicationsController {
    constructor(private adoptionApplicationsService: AdoptionApplicationsService){}
    @Post()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()
    @Roles("NORMAL")
    @ApiOperation({ summary: 'Create a new adoption application' })
    async create(
      @Body() createAdoptionApplicationDto: CreateAdoptionApplicationDto,
      @Request() req,
    ) {
      return this.adoptionApplicationsService.create(
        createAdoptionApplicationDto,
        req.user.id,
      );
    }
  
    @Get()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()
    @Roles("ADMIN")
    @ApiOperation({ summary: 'Get all adoption applications' })
    async findAll() {
      return this.adoptionApplicationsService.findAll();
    }
    
    @Get('my-applications')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()
    @Roles("Owner_ORPHANAGE","NORMAL")
    @ApiOperation({ summary: 'Get all adoption applications for the authenticated orphanage or normal' })
    async findAllForOrphanage(@Request() req) {
      return this.adoptionApplicationsService.findAllByOrphanage(req.user.id);
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()
    @Roles("ADMIN")
    @ApiOperation({ summary: 'Get an adoption application by id' })
    async findOne(@Param('id') id: string) {
      return this.adoptionApplicationsService.findOne(id);
    }
  
    @Put(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @ApiBearerAuth()
    @Roles("Owner_ORPHANAGE")
    @ApiOperation({ summary: 'Update an adoption application' })
    async update(
      @Param('id') id: string,
      @Body() updateAdoptionApplicationDto: UpdateAdoptionApplicationDto,
    ) {
      return this.adoptionApplicationsService.update(id, updateAdoptionApplicationDto);
    }
}
