import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
// import { CartItem } from './models/cart_item.model';
import { ProductModule } from '../product/product.module';

@Module({
  // imports: [SequelizeModule.forFeature([CartItem]), ProductModule],
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [CartItemsService],
})
export class CartItemsModule {}
