import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), StockModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
