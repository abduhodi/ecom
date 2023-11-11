import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({ example: 1, description: 'Cart ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cart_id: number;

  @ApiProperty({ example: 2, description: 'Product ID' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;

  @ApiProperty({ example: 3, description: 'Quantity' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
