import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AdminGuard } from './../shared/guards/admin.guard';
import { AuthGuard } from './../shared/guards/auth.guard';
import { AddProductDto } from './dto/add-product.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Patch('add/:id')
  addProduct(@Param('id') id: string, @Body() body: AddProductDto, @CurrentUser() user: any) {
    return this.ordersService.addProduct(id, body, user)
  }

  @Patch('remove/:id')
  removeProduct(@Param('id') id: string, @Body() body: AddProductDto, @CurrentUser() user: any) {
    return this.ordersService.removeProduct(id, body, user)
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('own')
  findOwn(@CurrentUser() user: any) {
    return this.ordersService.findOwn(user);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Post('payment')
  payment(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.payment(id, user);
  }
}
