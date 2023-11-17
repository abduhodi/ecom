import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateProductMediaDto {
  @ApiProperty({ example: 1, description: 'Id of product' })
  @IsNumber()
  product_id: number;
}
