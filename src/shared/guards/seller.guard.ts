import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IRequest } from '../types/request.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SellerGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
        @InjectModel('seller') private readonly sellersModel: Model <any>
        ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
    const req: IRequest = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.split(' ')[1] ?? req.headers.authorization;
    const data = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY});
    
    const seller = await this.sellersModel.findById(data.id);

    if(!seller || seller?.isApproved === false) throw new ForbiddenException('You are not allowed to go through')

    req.user = data.id;
    
    return true;
    
    } catch (error) {
      return false
    }
  }
}