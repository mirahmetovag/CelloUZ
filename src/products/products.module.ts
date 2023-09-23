import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/shared/models/Product.schema';
import { CategoriesModule } from './../categories/categories.module';
import { BrandsModule } from 'src/brands/brands.module';
import { SellerSchema } from 'src/shared/models/Seller.schema';

@Module({
  imports: [MongooseModule.forFeature([{schema: ProductSchema, name: 'product'}, {schema: SellerSchema, name: 'seller'}]), CategoriesModule, BrandsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
