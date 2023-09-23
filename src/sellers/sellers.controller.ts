import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { VerifySellerDto } from './dto/verify-seller.dto';
import { LoginSellerDto } from './dto/login-seller.dto';
import { ApiTags } from '@nestjs/swagger';
import { SellerGuard } from 'src/shared/guards/seller.guard';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@ApiTags('sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post('register')
  register(@Body() body: RegisterSellerDto) {
    return this.sellersService.register(body);
  }

  @Post('verify')
  verify(@Body() body: VerifySellerDto) {
    return this.sellersService.verify(body);
  }

  @Post('login')
  login(@Body() body: LoginSellerDto) {
    return this.sellersService.login(body);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.sellersService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @UseGuards(SellerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto, @CurrentUser() user: any) {
    return this.sellersService.update(id, updateSellerDto, user);
  }

  @UseGuards(AdminGuard)
  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.sellersService.approve(id);
  }

  @UseGuards(SellerGuard)
  @Delete(':id')
  remove(@Param('id') id: string,  @CurrentUser() user: any) {
    return this.sellersService.remove(id, user);
  }
}
