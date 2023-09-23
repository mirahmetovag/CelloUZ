import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('addresses')
@UseGuards(AuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(@Body() body: CreateAddressDto, @CurrentUser() user: any) {
    return this.addressesService.create(body, user);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get('own')
  findOwn(@CurrentUser() user: any) {
    return this.addressesService.findOwn(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }
}
