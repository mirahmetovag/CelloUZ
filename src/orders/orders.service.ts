import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from './../products/products.service';
import { AddressesService } from './../addresses/addresses.service';
import { UsersService } from './../users/users.service';
import { AddProductDto } from './dto/add-product.dto';


@Injectable()
export class OrdersService {
  constructor(@InjectModel('order') private readonly orderModel: Model <any>){}
  @Inject() private readonly productsService: ProductsService
  @Inject() private readonly addressesService: AddressesService
  @Inject() private readonly usersService: UsersService

  async addProduct(id: string, {amount}: AddProductDto, user: string) {
    const order = await this.orderModel.findOne({userId: user, status: 'Not completed'});
    const product = await this.productsService.findOne(id);
    if(!order) {
      const products = [{productId: id, pricePerUnit: product.pricePerUnit, amount}];
      const total = product.pricePerUnit * amount;
      const addressId = await this.addressesService.findByUser(user);
      const newOrder = new this.orderModel({products, addressId, total, userId: user});
      await newOrder.save();
      return {message: 'Order was created', newOrder};
    } else {
      const theProduct = order.products.filter(product => product.productId == id);
      if(!theProduct.length) {
        const newProduct = {productId: id, pricePerUnit: product.pricePerUnit, amount}
        await order.products.push(newProduct);
        const sum = product.pricePerUnit*amount;
        order.total += sum;
        await order.save();
        return {message: 'Product was added', order};
      } else {
        await this.orderModel.findOneAndUpdate(
          { userId: user, 'products.productId': id },
          { $inc: { 'products.$.count': 1 } },
          { new: true })
          const sum = product.pricePerUnit*amount;
          order.total += sum;
          return {message: 'Product amount was increased'};
      }
    }
  }

  async removeProduct(id: string, {amount}: AddProductDto, user: string) {
    const order = await this.orderModel.findOne({userId: user});
    if(!order) throw new BadRequestException('Order not found');
    await this.orderModel.findOneAndUpdate(
      { userId: user, 'products.productId': id, 'products.count': { $gt: 0 } },
      { $inc: { 'products.$.count': -1 } },
      { new: true }
    );
    return {message: 'Product amount was decreased'};
  }

  async findAll() {
    const orders = await this.orderModel.find().populate('userId');
    if(!orders) throw new NotFoundException('Not a single order was found');
    return orders;
  }

  async findOwn(user: string) {
    const orders = await this.orderModel.find({userId: user}).populate('addressId');
    if(!orders) throw new NotFoundException('Not a single order was found');
    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if(!order) throw new BadRequestException('Order was not found');
    return order;
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    if(order.status != 'New') throw new ForbiddenException('Order is already being processing');
    await this.orderModel.findByIdAndDelete(id);
    return {message: 'Order was canceled'};
  }

  async payment(id: string, user: string) {
    const order = await this.findOne(id);
    if(!order) throw new BadRequestException('Order was not found');
    const theUser = await this.usersService.findOne(user);
    if(!theUser) throw new BadRequestException('User was not found');
    const userId = user;
    const amount = order.total;
    await this.usersService.withdrawMoney({userId, amount });
    await this.orderModel.findByIdAndUpdate(id, {$set: {status: 'New'}});

    return {message: 'Order was finished'};
  }
}