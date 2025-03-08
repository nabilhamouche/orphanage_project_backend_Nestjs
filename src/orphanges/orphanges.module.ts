import { Module } from '@nestjs/common';
import { OrphangesService } from './orphanges.service';
import { OrphangesController } from './orphanges.controller';

@Module({
  providers: [OrphangesService],
  controllers: [OrphangesController]
})
export class OrphangesModule {}
