import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService,orphanageService ,AdminService} from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService,orphanageService,AdminService]
})
export class UserModule {}
