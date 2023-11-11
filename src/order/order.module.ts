import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './models/order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItemsModule } from '../order_items/order_items.module';

@Module({
  imports: [SequelizeModule.forFeature([Order]), OrderItemsModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
