import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from './../categories/categories.service';
import { BrandsService } from 'src/brands/brands.service';
import { Model } from 'mongoose';
import { UpdateAmountDto } from './dto/update-amount.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('product') private readonly productModel: Model <any>) {}
  @Inject() private readonly categoriesService: CategoriesService
  @Inject() private readonly brandsService: BrandsService
  async create({name, description, categoryId, brandId, pricePerUnit, availableAmount, imageName, ...data}: CreateProductDto, user: string) {
    const newProduct = new this.productModel({name, description, categoryId, brandId, pricePerUnit, availableAmount, imageName, ...data, sellerId: user});
    await newProduct.save()
    return {message: 'Product was successfully created', newProduct}
    }

  async findAll() {
    const products = await this.productModel.find();
    if(!products) throw new NotFoundException('Not a single product was found');
    return products;
  }

  async findByCategory(id: string) {
    const products = await this.productModel.find({categoryId: id});
    if(!products) throw new NotFoundException('Not a single product was found');
    return products;
  }

  async findByBrand(id: string) {
    const products = await this.productModel.find({brandId: id});
    if(!products) throw new NotFoundException('Not a single product was found');
    return products;
  }

  async findBySeller(id: string) {
    const products = await this.productModel.find({sellerId: id});
    if(!products) throw new NotFoundException('Not a single product was found');
    return products;
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).populate(['categoryId', 'brandId', 'sellerId']);
    if(!product) throw new BadRequestException('Product not found');
    return product;
  }

  async updateInfo(id: string, {name, description, categoryId, brandId, pricePerUnit, availableAmount, imageName, ...data}: UpdateProductDto, user: string) {
    const product = await this.findOne(id);
    if(product.userId !== user) throw new ForbiddenException('You are not owner of this product');
    await this.productModel.findByIdAndUpdate(id, {$set: {name: name, description:name, categoryId:categoryId, brandId:categoryId, pricePerUnit: pricePerUnit, availableAmount: availableAmount, imageName:imageName, ...data}})
  }

  async updateAmount(id: string, {newAmount}: UpdateAmountDto, user: string) {
    const product = await this.findOne(id);
    if(product.userId !== user) throw new ForbiddenException('You are not owner of this product');
    
    await this.productModel.findByIdAndUpdate(id, {$set: {availableAmount: newAmount}});
    return {message: 'Amount of the product was changed'};
  }

  async remove(id: string, user: string) {
    const product = await this.findOne(id);
    if(product.userId !== user) throw new ForbiddenException('You are not owner of this product');
    await this.productModel.findByIdAndDelete(id);
    return {message: 'Product was successfully deleted'};
  }
}
