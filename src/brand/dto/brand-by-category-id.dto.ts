import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BrandByCategoryIdDto {
  @ApiProperty({ example: 1, description: 'Category Id' })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
