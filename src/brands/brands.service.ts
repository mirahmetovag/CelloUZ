import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService {
  constructor(@InjectModel('brand') private readonly brandModel: Model <any>) {}
  
  async create({name, label}: CreateBrandDto) {
    const brand = await this.brandModel.findOne({name});
    if (brand) throw new BadRequestException('Brand with the same name already exists');

    const newBrand = await this.brandModel.create({name, label});
    return {message: 'New brand was added', newBrand};
  }

  async findAll() {
    const brands = await this.brandModel.find();
    if(!brands.length) throw new NotFoundException('There is not a single brand');
    return brands;
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id);
    if(!brand) throw new NotFoundException('Brand was not found');
    return brand;
  }

  async findOneByName(name: string) {
    const brand = await this.brandModel.findOne({name});
    if(!brand) throw new NotFoundException('Brand was not found');
    return brand;
  }

  async update(id: string, {name, label}: UpdateBrandDto) {
    const brand = await this.brandModel.findById(id);
    if(!brand) throw new NotFoundException('Brand was not found');
    
    const updatedBrand = await this.brandModel.findByIdAndUpdate(id, { $set: {name: name, label:label}});
    return {message: 'Brand was updated', updatedBrand};
  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    await this.brandModel.findByIdAndDelete(id);
    return {message: 'Brand was successfully deleted'};
  }
}
