import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryBrandIdDto {
  @ApiProperty({ example: 1, description: 'Id of the category' })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({ example: 1, description: 'Id of the brand' })
  @IsNumber()
  @IsNotEmpty()
  brand_id: number;
}
