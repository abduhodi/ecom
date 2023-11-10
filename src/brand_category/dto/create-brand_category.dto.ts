import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBrandCategoryDto {
  @ApiProperty({ example: 1, description: 'Id of brand' })
  @IsNumber()
  @IsNotEmpty()
  brand_id: number;

  @ApiProperty({ example: 1, description: 'Id of category' })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
