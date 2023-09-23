import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from 'src/shared/models/Seller.schema';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { MailModule } from 'src/mail/mail.module';
import { UserSchema } from 'src/shared/models/User.schema';

@Module({
  imports: [MongooseModule.forFeature([{schema: SellerSchema, name: 'seller'}, {schema: UserSchema, name: 'user'}]), JwtModule.register({
  secret: process.env.JWT_SECRET_KEY,
        signOptions: {expiresIn: '24h'},
        global: true
      }),
    CacheModule.register({ttl: 120000}), MailModule],
  controllers: [SellersController],
  providers: [SellersService],
  exports: [SellersService]
})
export class SellersModule {}
