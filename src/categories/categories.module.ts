import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/shared/models/Category.schema';
import { UserSchema } from 'src/shared/models/User.schema';

@Module({
  imports: [MongooseModule.forFeature([{schema: CategorySchema, name: 'category'}, {schema: UserSchema, name: 'user'}])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
