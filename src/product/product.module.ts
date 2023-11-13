import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { SessionItem } from '../session_items/model/session_item.model';
import { ProductViewModule } from 'src/product_view/product_view.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), ProductViewModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
