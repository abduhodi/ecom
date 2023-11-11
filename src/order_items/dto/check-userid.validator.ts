import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { OrderService } from '../../order/order.service';

@ValidatorConstraint({ name: 'ID', async: false })
@Injectable()
export class CheckOrderIdValidator implements ValidatorConstraintInterface {
  constructor(private readonly orderService: OrderService) {}
  async validate(value: number, args: ValidationArguments) {
    try {
      const order = await this.orderService.findOne(value);
      return !!order;
    } catch (error) {
      return false;
    }
  }
}
