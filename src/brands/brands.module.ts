import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandSchema } from 'src/shared/models/Brand.schema';
import { UserSchema } from 'src/shared/models/User.schema';

@Module({
  imports: [MongooseModule.forFeature([{schema: BrandSchema, name: 'brand'}, {schema: UserSchema, name: 'user'}])],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService]
})
export class BrandsModule {}
