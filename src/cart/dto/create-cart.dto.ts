import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsPositive,
} from 'class-validator';

export class CreateCartDto {
  // @ApiProperty({ example: 1, description: 'User ID' })
  // @IsNotEmpty()
  // @IsNumber()
  // user_id: number;

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
