import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { OrphangesModule } from './orphanges/orphanges.module';
import { AdoptionApplicationsModule } from './adoption-applications/adoption-applications.module';
import { OrphanModule } from './orphan/orphan.module';

@Module({
  imports: [AuthModule, PrismaModule,ConfigModule.forRoot({isGlobal:true}), UserModule, OrphangesModule, AdoptionApplicationsModule, OrphanModule],
})
export class AppModule {
  
}
