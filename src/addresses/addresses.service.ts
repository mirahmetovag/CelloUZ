import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AddressesService {
  constructor(@InjectModel('address') private readonly addressModel: Model <any>) {}

  async create({city, street, house, apartment}: CreateAddressDto, user: string) {
    const address = await this.addressModel.findOne({city, street, house, apartment});
    if(!address) throw new BadRequestException('The address already exists');
    const newAddress = new this.addressModel({city, street, house, apartment, userId: user});
    await newAddress.save();
    return {message:'New address was saved', newAddress};
  }

  async findAll() {
    const addresses = await this.addressModel.find();
    if(!addresses) throw new NotFoundException('There is not a single address');
    return addresses;
  }

  async findOwn(user: string) {
    const addresses = await this.addressModel.find({userId: user});
    if(!addresses) throw new NotFoundException('You have not a single address');
    return addresses;
  }

  async findByUser(user: string) {
    const address = await this.addressModel.findOne({userId: user});
    if(!address) throw new NotFoundException('You have not a single address');
    return address;
  }


  async findOne(id: string) {
    const address = await this.addressModel.findById(id);
    if(!address) throw new BadRequestException('There is not address with such id');
    return address;
  }

  async remove(id: string) {
    const address = await this.addressModel.findById(id);
    if(!address) throw new BadRequestException('There is not address with such id');
    await this.addressModel.findByIdAndDelete(id);
    return {message: 'Address was deleted'};
  }
}
