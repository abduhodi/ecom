import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'mobile', description: 'Name of category' })
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @ApiProperty({ example: '1', description: 'id of category parent' })
  // @IsNumber()
  // @IsNotEmpty()
  parent_category_id: number;

  @ApiProperty({ example: '1', description: 'Position of category' })
  // @IsNumber()
  // @IsNotEmpty()
  positon: number;
}
