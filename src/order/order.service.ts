import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { District } from '../district/models/district.model';
import { OrderAddress } from '../order_address/models/order_address.model';
// import { Address } from '../address/model/address.model';
import { OrderItem } from '../order_items/models/order_item.model';
import { Product } from '../product/models/product.model';
import { User } from '../user/models/user.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { Order } from './models/order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderRepository: typeof Order,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const order = await this.orderRepository.create(createOrderDto);
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll({
      include: { all: true },
    });
    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      include: [
        {
          model: OrderAddress,
          attributes: { include: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: District,
              attributes: { include: ['createdAt', 'updatedAt'] },
            },
          ],
        },
        {
          model: User,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        // {
        //   model: Address,
        //   attributes: { exclude: ['createdAt', 'updatedAt'] },
        // },
        {
          model: OrderItem,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Product,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
      ],
    });
    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<[number, Order[]]> {
    const updatedOrders = await this.orderRepository.update(updateOrderDto, {
      where: { id },
      returning: true,
    });
    return updatedOrders;
  }

  async remove(id: number): Promise<number> {
    const deletedOrders = await this.orderRepository.destroy({
      where: { id },
    });
    return deletedOrders;
  }
}
