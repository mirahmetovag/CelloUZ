import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { SellerGuard } from 'src/shared/guards/seller.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { UpdateAmountDto } from './dto/update-amount.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(SellerGuard)
  @Post()
  create(@Body() body: CreateProductDto, @CurrentUser() user: any) {
    return this.productsService.create(body, user);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('category/:id')
  findByCategory(@Param('id') id: string) {
    return this.productsService.findByCategory(id);
  }

  @Get('brand/:id')
  findByBrand(@Param('id') id: string) {
    return this.productsService.findByBrand(id);
  }

  @Get('seller/:id')
  findBySeller(@Param('id') id: string) {
    return this.productsService.findBySeller(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  updateInfo(@Param('id') id: string, @Body() body: UpdateProductDto, @CurrentUser() user: any) {
    return this.productsService.updateInfo(id, body, user);
  }

  @Patch('amount/:id')
  updateAmount(@Param('id') id: string, @Body() body: UpdateAmountDto, @CurrentUser() user: any) {
    return this.productsService.updateAmount(id, body, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.productsService.remove(id, user);
  }
}
