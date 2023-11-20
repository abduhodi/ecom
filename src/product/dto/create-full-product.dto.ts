import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Min,
} from 'class-validator';

export class CreateFullProductDto {
  @ApiProperty({ example: 1, description: 'Id of category' })
  @IsNumber()
  category_id: number;

  @ApiProperty({ example: 1, description: 'Id of brand' })
  @IsNumber()
  brand_id: number;

  @ApiProperty({ example: 1, description: 'Id of model' })
  @IsNumber()
  model_id: number;

  @ApiProperty({ example: 1000000, description: 'Price of product' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 42, description: 'Quantity' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsObject()
  product_info: { [key: number]: string };
}
