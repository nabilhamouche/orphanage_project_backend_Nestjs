import { Module } from '@nestjs/common';
import { AdoptionApplicationsService } from './adoption-applications.service';
import { AdoptionApplicationsController } from './adoption-applications.controller';

@Module({
  providers: [AdoptionApplicationsService],
  controllers: [AdoptionApplicationsController]
})
export class AdoptionApplicationsModule {}
