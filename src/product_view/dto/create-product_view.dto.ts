import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateProductViewDto {
  @ApiProperty({ example: 1, description: 'Id of Product' })
  @IsNumber()
  product_id: number;
}
