import { Controller, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UpdateRequestAuthDto } from './dto/update_request-auth.dto';
import { UpdateVerifyAuthDto } from './dto/update_verify-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { AuthGuard } from './../shared/guards/auth.guard';
import { CurrentUser } from './../shared/decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body);
  }

  @Post('verify')
  verify(@Body() body: VerifyAuthDto) {
    return this.authService.verify(body);
  }

  @Post('login')
  login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }

  @Post('password')
  updateRequest(@Body() body: UpdateRequestAuthDto) {
    return this.authService.updateRequest(body);
  }

  @Patch()
  updateVerify(@Body() body: UpdateVerifyAuthDto) {
    return this.authService.updateVerify(body);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@Body() password: string, @CurrentUser() user: any) {
    return this.authService.remove(password, user);
  }
}
