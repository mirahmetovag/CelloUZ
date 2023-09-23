import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from 'src/shared/models/Address.schema';

@Module({
  imports: [MongooseModule.forFeature([{schema: AddressSchema, name: 'address'}])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService]
})
export class AddressesModule {}
