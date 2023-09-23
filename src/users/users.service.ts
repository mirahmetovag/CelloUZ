import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { PaymentDto } from './dto/payment.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Stripe } from 'stripe';
import { AddMoneyDto } from './dto/add-money.dto';

const stripe_sc_key = process.env.STRIPE_SC_KEY;

@Injectable()
export class UsersService {
  private readonly stripe = new Stripe(stripe_sc_key, { apiVersion: '2023-08-16' })
  constructor(@InjectModel('user') private readonly usersModel: Model <any>) {}
  async create({username, password, email, role}: CreateUserDto) {
    const user = await this.usersModel.create({username, password, email, role});
    return user;
  }

  async findAll() {
    const users = await this.usersModel.find();
    if(!users.length) throw new BadRequestException('There is not a single user');
    return users;
  }

  async findOne(id: string) {
    const user = await this.usersModel.findById(id);
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersModel.findOne({username: username});
    return user;
  }

  async updatePassword({username, newPassword}: UpdateUserDto) {
    const user = await this.findByUsername(username);
    if(!user) throw new BadRequestException('User was not found');
    user.password = newPassword;
    await user.save();
    return {message: 'Password was updated'}
  }

  async remove(id: string) {
    const user = await this.usersModel.findById(id);
    if(!user) throw new BadRequestException('User was not found');
    await this.usersModel.findByIdAndDelete(id);
    return {message: 'Account was removed'};
  }

  async addMoney({userId, amount, paymentId}: AddMoneyDto) {
    const user = await this.findOne(userId);
    await this.stripe.paymentIntents.create({
      amount: amount,
      currency: 'USD',
      description: 'Adding balance to wallet',
      payment_method: paymentId,
      confirm: true,
      return_url: 'http://localhost:3000/'
    });
    const newBalance = user.balance + amount;
    await this.usersModel.findByIdAndUpdate(userId, {$set: {balance: newBalance}});
    return {message: 'Money successfully added to user balance'};
  }

  async withdrawMoney ({userId, amount}: PaymentDto) {
    const user = await this.findOne(userId);
    const newBalance = user.balance - amount;
    await this.usersModel.findByIdAndUpdate(userId, {$set: {balance: newBalance}});
    return {message: 'Money successfully withdrawn from user balance'};
  }
}