import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('category') private readonly categoryModel: Model <any>) {}
  async create({name, ...data}: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({name});
    if(category) throw new BadRequestException('Category with this name already exists');
    const newCategory = new this.categoryModel({name, ...data});
    await newCategory.save()
    return newCategory;
  }

  async findAll() {
    const categories = await this.categoryModel.find();
    if(!categories.length) throw new BadRequestException('There is no a single category');
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);
    if(!category) throw new BadRequestException('Category was not found');
    return category;
  }

  async findOneByName(name: string) {
    const category = await this.categoryModel.findOne({name});
    if(!category) throw new BadRequestException('Category was not found');
    return category;
  }

  async findByName(name: string) {
    const category = await this.categoryModel.find({name});
    if(!category) throw new BadRequestException('Category was not found');
    return category;
  }

  async update(id: string, name: UpdateCategoryDto) {
    const category = await this.categoryModel.findById(id);
    if(!category) throw new BadRequestException('Category was not found');

    category.name = name;
    await category.save();
    return {message: `Category's new name - ${category.name}`};
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    await this.categoryModel.findByIdAndDelete(id);
    return {message: 'Category was successfully deleted'};
  }
}
