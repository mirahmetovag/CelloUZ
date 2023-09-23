import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/shared/models/Order.schema';
import { ProductsModule } from 'src/products/products.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { UsersModule } from 'src/users/users.module';
import { UserSchema } from 'src/shared/models/User.schema';
import { SellersModule } from 'src/sellers/sellers.module';

@Module({
  imports: [MongooseModule.forFeature([{schema: OrderSchema, name: 'order'}, {schema: UserSchema, name: 'user'}]), ProductsModule, AddressesModule, UsersModule, SellersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
