import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ example: 'honor', description: 'Name of brand' })
  @IsString()
  @IsNotEmpty()
  brand_name: string;

  @ApiProperty({ example: 'best brand', description: 'description' })
  @IsString()
  brand_description: string;

  @ApiProperty({ example: '1', description: 'Position of brand' })
  @IsNumber()
  @IsNotEmpty()
  positon: number;

  @ApiProperty({ example: 'photo', description: 'Photo of brand' })
  @IsString()
  image: string;
}
