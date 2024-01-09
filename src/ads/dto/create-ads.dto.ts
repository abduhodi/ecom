import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateAdsDto {
  @ApiProperty({ example: 'Qaynoq chagirmalar!', description: 'Title of Ads' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '/discount/qaynoq-chegirmalar',
    description: 'path of Ads',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ example: 1, description: 'Position of Ads' })
  @IsNotEmpty()
  @IsNumber()
  position: number;

  @ApiProperty({
    example: 'http://localhost:3000/api/media/asdf2-sd23e-d23eddvf.png',
    description: 'Large image of Ads',
  })
  @IsNotEmpty()
  @IsString()
  image_high: string;

  @ApiProperty({
    example: 'http://localhost:3000/api/media/asdf2-sd23e-d23eddvf.png',
    description: 'Small image of Ads',
  })
  @IsNotEmpty()
  @IsString()
  image_low: string;

  @ApiProperty({
    example: true,
    description: 'Status activeness of Ads',
  })
  @IsBoolean()
  status: boolean;
}
