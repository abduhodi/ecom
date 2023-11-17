import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductInfoDto } from './create-product_info.dto';
import { IsNumber } from 'class-validator';

export class UpdateProductInfoDto extends PartialType(CreateProductInfoDto) {
  @ApiProperty({ example: 1, description: 'Product ID' })
  @IsNumber()
  product_id: number;

  id: number;
}
