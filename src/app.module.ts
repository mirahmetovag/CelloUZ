import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MailModule } from './mail/mail.module';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { OrdersModule } from './orders/orders.module';
import { SellersModule } from './sellers/sellers.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { SharedModule } from './shared/shared.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}), MongooseModule.forRoot(process.env.DB_URL), AuthModule, UsersModule, ProductsModule, MailModule, FileModule, OrdersModule, SellersModule, CategoriesModule, BrandsModule, SharedModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
