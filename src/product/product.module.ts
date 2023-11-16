import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { StockModule } from '../stock/stock.module';
import { ProductViewModule } from 'src/product_view/product_view.module';
import { ProductInfo } from 'src/product_info/models/product_info.model';

import { SaleModule } from '../sale/sale.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product,ProductInfo]),
    ProductViewModule,
    StockModule,
    SaleModule,
  ],




  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
