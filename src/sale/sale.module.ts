import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sale } from './models/sale.model';
import { Product } from '../product/models/product.model';
import { ProductModel } from '../product_model/model/product_model.model';

@Module({
  imports: [SequelizeModule.forFeature([Sale, Product, ProductModel])],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [SaleService],
})
export class SaleModule {}
