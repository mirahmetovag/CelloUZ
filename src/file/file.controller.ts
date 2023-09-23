import { Controller, Get, Post, UseInterceptors, UploadedFile, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';
import { CreateFileDto } from './dto/create-file.dto';
import { SellerGuard } from 'src/shared/guards/seller.guard';

// @UseGuards(SellerGuard)
@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor() {}
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const randomName = v4();
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() body: CreateFileDto) {
  return { data: file.filename, message: 'File was uploaded'}
}
}
