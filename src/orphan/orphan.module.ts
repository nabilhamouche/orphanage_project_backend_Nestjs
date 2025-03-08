import { Module } from '@nestjs/common';
import { OrphanService } from './orphan.service';
import { OrphanController } from './orphan.controller';

@Module({
  providers: [OrphanService],
  controllers: [OrphanController]
})
export class OrphanModule {}
