import { Module } from '@nestjs/common';
import { ProductInfoService } from './product_info.service';
import { ProductInfoController } from './product_info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductInfo } from './models/product_info.model';
import { ProductModule } from 'src/product/product.module';
import { AttributesModule } from 'src/attributes/attributes.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductInfo]),
    ProductModule,
    AttributesModule,
  ],
  controllers: [ProductInfoController],
  providers: [ProductInfoService],
  exports: [ProductInfoService],
})
export class ProductInfoModule {}
