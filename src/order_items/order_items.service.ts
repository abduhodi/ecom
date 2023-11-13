import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';

import { OrderItem } from './models/order_item.model'; 

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem)
    private orderItemRepository: typeof OrderItem,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.create(createOrderItemDto);
    return orderItem;
  }

  async findAll(): Promise<OrderItem[]> {
    const orderItems = await this.orderItemRepository.findAll({
      include: { all: true },
    });
    return orderItems;
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
    });
    return orderItem;
  }

  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<[number, OrderItem[]]> {
    const updatedOrderItems = await this.orderItemRepository.update(
      updateOrderItemDto,
      { where: { id }, returning: true },
    );
    return updatedOrderItems;
  }

  async remove(id: number): Promise<number> {
    const deletedOrderItems = await this.orderItemRepository.destroy({
      where: { id },
    });
    return deletedOrderItems;
  }
}
