import { Body, Controller, Get, Param, UseGuards, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { UsersService } from './users.service';
import { AddMoneyDto } from './dto/add-money.dto';

@UseGuards(AdminGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  addMoney(@Body() body: AddMoneyDto) {
    return this.usersService.addMoney(body);
  }
}