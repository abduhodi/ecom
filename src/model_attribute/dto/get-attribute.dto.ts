import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAttributeDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1 })
  model_id: number;
}
