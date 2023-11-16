
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Validate } from 'class-validator';
import { CheckOrderIdValidator } from './check-userid.validator';


export class CreateOrderItemDto {
  @ApiProperty({ example: 1, description: 'Order ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Validate(CheckOrderIdValidator, { message: 'Order ID not found' })
  orderId: number;

  @ApiProperty({ example: 2, description: 'Product ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productId: number;

  @ApiProperty({ example: 3, description: 'Quantity' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  // @ApiProperty({ example: 29.99, description: 'Subtotal' })
  // @IsNotEmpty()
  // @IsNumber()
  // @IsPositive()
  // subtotal: number;
}
