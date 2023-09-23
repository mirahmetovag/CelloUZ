import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IRequest } from '../types/request.types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,
    @InjectModel('user') private readonly usersModel: Model <any>
    ){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
    const req: IRequest = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.split(' ')[1] ?? req.headers.authorization;
    const data = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY});
    
    const admin = await this.usersModel.findById(data.id);
  
    if(admin.role != 'Admin') throw new ForbiddenException('You are not allowed to go through');
    
    req.user = data.id;
    
    return true;
    
    } catch (error) {
      return false
    }
  }
}