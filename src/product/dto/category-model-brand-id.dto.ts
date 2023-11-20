import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CategoryModelBrandDto {
  @ApiProperty({ example: 1, description: 'Id of model' })
  @IsNumber()
  model_id: number;

  @ApiProperty({ example: 1, description: 'Id of category' })
  @IsNumber()
  category_id: number;

  @ApiProperty({ example: 1, description: 'Id of Brand' })
  @IsNumber()
  brand_id: number;
}
