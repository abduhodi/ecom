import { Module } from '@nestjs/common';
import { ProductInfoService } from './product_info.service';
import { ProductInfoController } from './product_info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductInfo } from './models/product_info.model';
import { Product } from 'src/product/models/product.model';
import { Attribute } from 'src/attributes/models/attribute.model';

@Module({
  imports:[SequelizeModule.forFeature([
    ProductInfo
  ])],
  controllers: [ProductInfoController],
  providers: [ProductInfoService],
  exports:[ProductInfoService]
})
export class ProductInfoModule {}
