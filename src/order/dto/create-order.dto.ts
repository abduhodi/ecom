import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
  IsArray,
  ArrayMinSize,
  IsDate,
  IsDateString,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  user_id: number;

  @ApiProperty({ example: '2023-08-31', description: 'Order date' })
  @IsNotEmpty()
  @IsDateString()
  order_date: Date;

  @ApiProperty({ example: 'Processing', description: 'Order status' })
  @IsNotEmpty()
  @IsString()
  order_status: string;

  @ApiProperty({ example: 100.5, description: 'Total amount' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total_amount: number;

  @ApiProperty({ example: '123 Shipping St', description: 'Shipping address' })
  @IsNotEmpty()
  @IsString()
  shipping_address: number;
}
