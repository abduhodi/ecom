import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { SessionItem } from '../session_items/model/session_item.model';
import { ProductViewModule } from 'src/product_view/product_view.module';
import { ProductInfo } from 'src/product_info/models/product_info.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, ProductInfo]),
    ProductViewModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
