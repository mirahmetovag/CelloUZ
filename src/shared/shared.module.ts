import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from './models/Seller.schema';
import { UserSchema } from './models/User.schema';

@Module({
    imports: [MongooseModule.forFeature([{schema: SellerSchema, name: 'seller'}, {schema: UserSchema, name: 'user'}])]
})
export class SharedModule {}