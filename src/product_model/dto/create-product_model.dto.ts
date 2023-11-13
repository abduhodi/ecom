import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductModelDto {
  @ApiProperty({ example: 'Iphone 14', description: 'Name of model' })
  @IsString()
  @IsNotEmpty()
  model_name: string;

  @ApiProperty({ example: 1, description: 'Id of category_brand' })
  @IsNumber()
  category_brand_id: number;
}
