import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterSellerDto } from './dto/register-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from './../mail/mail.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { VerifySellerDto } from './dto/verify-seller.dto';
import { LoginSellerDto } from './dto/login-seller.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SellersService {
  constructor(@InjectModel('seller') private readonly sellersModel: Model <any>, 
  @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}
  @Inject() private readonly mailService: MailService
  @Inject() private readonly jwtService: JwtService
  
  async register({name, description, stir, password, email}: RegisterSellerDto) {
    const seller = await this.sellersModel.findOne({name});
    if(seller) throw new ConflictException('Seller with this name already exists');

    const hashedPass = await bcrypt.hash(password, 10);

    const Otp = Math.floor(100000 + Math.random() * 900000);

    this.cacheManager.set(email, JSON.stringify({otp: Otp, password: hashedPass, name: name, description: description, stir: stir, email: email, count: 3}));

    const html = `<b>Code: ${Otp}</b>`;

    this.mailService.sendMail(email, html);

    return {message: 'Your verification code was sent. Please check your email'};
  }

  async verify({email, otp}: VerifySellerDto) {
    const cache: string = await this.cacheManager.get(email);
    if (!cache) throw new ForbiddenException('Invalid code');
    const res = JSON.parse(cache);
    if(res.count == 0) throw new ForbiddenException('Invalid code');
    if (res.otp != otp) {
      this.cacheManager.set(email, JSON.stringify({otp: res.otp, password: res.password, name: name, description: res.description, stir: res.stir, email: email, count: res.count - 1}));
      throw new ForbiddenException('Invalid code');
    }

    const newSeller = await this.sellersModel.create({
      name: res.name,
      description: res.description,
      stir: res.stir,
      email,
      password: res.password,
    });

    const token = await this.jwtService.signAsync({id: newSeller._id});

    await this.cacheManager.del(email);
    return {message: 'You are registered', token: token};
  }

  async login({email, password}: LoginSellerDto) {
    const seller = await this.sellersModel.findOne({email});
    if (!seller) throw new ForbiddenException('Invalid email or password');

    const isPass = await bcrypt.compare(password, seller.password);
    if(!isPass) throw new ForbiddenException('Invalid email or password');

    const token = await this.jwtService.signAsync({id: seller._id});
    return {message: 'You are logged in', token: token};
  }

  async findAll() {
    const sellers = await this.sellersModel.find();
    if(!sellers.length) throw new NotFoundException('There is not a single seller')
    return sellers;
  }

  async findOne(id: string) {
    const seller = await this.sellersModel.findById(id);
    if(!seller) throw new BadRequestException('Seller was not found');
    return seller;
  }

  async update(id: string, {name, description, stir}: UpdateSellerDto, user: string) {
    const seller = await this.sellersModel.findById(id);
    if(!seller) throw new BadRequestException('Seller was not found');
    if(id != user) throw new ForbiddenException('You are not allowed to updated this information');
    await this.sellersModel.findByIdAndUpdate(id, {$set: {name, description, stir}});
    return {message: 'You successfully updated your information'};
  }

  async approve(id: string) {
    const seller = await this.sellersModel.findById(id);
    if(!seller) throw new BadRequestException(`Seller with id ${id} not found`);
    
    await this.sellersModel.findByIdAndUpdate(id, {$set: {isApproved: true}});
    return {message: 'Seller request was approved'}
  }

  async remove(id: string, user: string) {
    const seller = await this.sellersModel.findById(id);
    if(!seller) throw new BadRequestException('Seller was not found');
    if(id != user) throw new ForbiddenException('You are not allowed to updated this information');
    await this.sellersModel.findByIdAndDelete(id);
    return {message: 'Seller was successfully deleted'};
  }
}
