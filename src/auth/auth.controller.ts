import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authdto, Registerdto } from './dto';
@Controller('auth')
export class AuthController {
constructor(private AuthService:AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  log_in(dto:Authdto){
      return this.AuthService.log_in(dto);
    }
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(dto:Registerdto){
    return this.AuthService.register(dto);
  }
}
