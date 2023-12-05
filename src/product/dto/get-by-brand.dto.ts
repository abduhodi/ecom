import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetByBrand {
  @ApiProperty({ example: 1, description: 'Id of category' })
  @IsNumber()
  brand_id: number;
}
