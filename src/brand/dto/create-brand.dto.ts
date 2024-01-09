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

  @ApiProperty({ example: 1, description: 'Position of brand' })
  // @IsNumber()
  position: number;

  @ApiProperty({
    example: 'http://localhost:3000/api/media/asdf23-weasd-23esd-23ws.png',
    description: 'Image of brand',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
