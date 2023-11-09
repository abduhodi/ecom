import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Iphone 15', description: 'Name of product' })
  @IsString()
  @IsNotEmpty()
  name: string;

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
}
