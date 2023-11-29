import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { StockModule } from '../stock/stock.module';
import { ProductViewModule } from 'src/product_view/product_view.module';
import { ProductInfo } from 'src/product_info/models/product_info.model';
import { SaleModule } from '../sale/sale.module';
import { ProductInfoModule } from '../product_info/product_info.module';
import { CategoryModule } from 'src/category/category.module';
import { AttributesModule } from 'src/attributes/attributes.module';
import { ProductModelModule } from 'src/product_model/product_model.module';
import { BrandModule } from 'src/brand/brand.module';
import { ModelAttributeModule } from '../model_attribute/model_attribute.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, ProductInfo]),
    ProductViewModule,
    StockModule,
    ProductInfoModule,
    SaleModule,
    AttributesModule,
    CategoryModule,
    ProductModelModule,
    BrandModule,
    ModelAttributeModule,
  ],

  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
