import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { SessionItem } from '../session_items/model/session_item.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, SessionItem])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
