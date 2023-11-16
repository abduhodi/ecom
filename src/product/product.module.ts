import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { StockModule } from '../stock/stock.module';
import { ProductViewModule } from 'src/product_view/product_view.module';
import { SaleModule } from '../sale/sale.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    ProductViewModule,
    StockModule,
    SaleModule,
  ],

  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
