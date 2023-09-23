import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UpdateRequestAuthDto } from './dto/update_request-auth.dto';
import { UpdateVerifyAuthDto } from './dto/update_verify-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { UsersService } from './../users/users.service';
import { MailService } from './../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  @Inject() private readonly usersService: UsersService
  @Inject() private readonly mailService: MailService
  @Inject() private readonly jwtService: JwtService
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}

  async register({username, password, email}: RegisterAuthDto) {
    
    const user = await this.usersService.findByUsername(username);
    
    if (user) throw new ForbiddenException('Username already exists');

    const hashedPass = await bcrypt.hash(password, 10);

    const Otp = Math.floor(100000 + Math.random() * 900000);
    
    this.cacheManager.set(username, JSON.stringify({otp: Otp, password: hashedPass, email: email, count: 3}));

    const html = `<b>Code: ${Otp}</b>`;
    
    this.mailService.sendMail(email, html);

    return {message: 'Your verification code was sent. Please check your email'};
  }

  async verify ({username, otp}: VerifyAuthDto) {
    const cache: string = await this.cacheManager.get(username);
    if (!cache) throw new ForbiddenException('Invalid code');
    const res = JSON.parse(cache);
    if(res.count == 0) throw new ForbiddenException('Invalid code');
    if (res.otp != otp) {
      this.cacheManager.set(username, JSON.stringify({otp: res.otp, password: res.password, email: res.email, count: res.count - 1}));
      throw new ForbiddenException('Invalid code');
    }
    let role = 'User'
    
    if(res.email == process.env.ADMIN_EMAIL) {
      role = 'Admin';
    } 
    const newUser = await this.usersService.create({
      username,
      password: res.password,
      email: res.email,
      role
    });

    const token = await this.jwtService.signAsync({id: newUser._id});

    await this.cacheManager.del(username);
    return {message: 'You are registered', token: token};
  }

  async login({username, password}: LoginAuthDto) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new ForbiddenException('Invalid username or password');

    const isPass = await bcrypt.compare(password, user.password);
    if(!isPass) throw new ForbiddenException('Invalid username or password');

    const token = await this.jwtService.signAsync({id: user._id});
    return {message: 'You are logged in', token: token};
  }


  async updateRequest ({username}: UpdateRequestAuthDto) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new ForbiddenException('Username does not exist');

    const Otp = Math.floor(100000 + Math.random() * 900000);
    this.cacheManager.set(username, JSON.stringify({otp: Otp, count: 3}));

    const html = `<b>Code for changing ypur password: ${Otp}</b>`;

    this.mailService.sendMail(user.email, html);

    return {message: 'Your verification code for changing password was sent. Please check your email'};
  }

  async updateVerify ({username, newPassword, otp}: UpdateVerifyAuthDto) {
    const cache: string = await this.cacheManager.get(username);
    if (!cache) throw new ForbiddenException('Invalid code');

    const res = JSON.parse(cache);
    if(res.count == 0) throw new ForbiddenException('Invalid code');

    if (res.otp != otp) {
      this.cacheManager.set(username, JSON.stringify({otp: res.otp, count: res.count - 1}));
      throw new ForbiddenException('Invalid code');
    }

    const hashedPass = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword({username, newPassword: hashedPass});

    await this.cacheManager.del(username);
    return {message: 'Your password was updated. Now you can use it to log in'};
  }

  async remove( user: string, password: string ) {
    const theUser = await this.usersService.findOne(user);
    if (password != theUser.password) throw new ForbiddenException('The password is wrong');
    
    await this.usersService.remove(user);
    return {message: 'Your account was removed'};
  }
}
