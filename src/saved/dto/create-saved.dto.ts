import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateSavedDto {
  @ApiProperty({ example: 1, description: 'Id of product' })
  @IsNumber()
  product_id: number;
}
