import { Module } from '@nestjs/common';
import { SellersModule } from 'src/sellers/sellers.module';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [],
})
export class FileModule {}
