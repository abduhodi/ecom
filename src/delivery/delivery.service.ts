import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Delivery } from './models/delivery.model';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery) private deliveryRepo: typeof Delivery,
    private OrderService: OrderService,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    try {
      await this.OrderService.findOne(createDeliveryDto.order_id);
      const delivery = await this.deliveryRepo.create(createDeliveryDto);
      return { message: 'Created successfully', delivery };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const deliverys = await this.deliveryRepo.findAll({ include: { all: true } });
    return deliverys;
  }

  async findOne(id: number) {
    const delivery = await this.deliveryRepo.findByPk(id, {
      include: { all: true },
    });
    if (!delivery) {
      throw new NotFoundException('Delivery not found with such id');
    }
    return delivery;
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    await this.OrderService.findOne(updateDeliveryDto.order_id);
    const updated = await this.deliveryRepo.update(updateDeliveryDto, {
      where: { id },
      returning: true,
    });
    if (!updated[0]) {
      throw new BadRequestException('Error, please check before you update');
    }
    return {
      message: 'Updated successfully',
      product: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const delivery = await this.findOne(id);
    await delivery.destroy();
    return { message: 'Deleted successfull' };
  }
}
