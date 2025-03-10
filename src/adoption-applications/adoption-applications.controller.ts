import { Controller } from '@nestjs/common';
import { AdoptionApplicationsService } from './adoption-applications.service';

@Controller('adoption-applications')
export class AdoptionApplicationsController {
    constructor(private adoptionApplicationsService: AdoptionApplicationsService){}
}
