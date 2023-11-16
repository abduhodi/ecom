import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({
    example: "One of the best product I've ever purchased",
    description: 'Rating about product',
  })
  @IsNumber()
  @IsNotEmpty()
  @Max(5)
  @Min(0)
  rating: number;

  @ApiProperty({ example: 1, description: 'Id of product' })
  @IsNumber()
  product_id: number;
}
