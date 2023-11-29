import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetByCategory {
  @ApiProperty({ example: 1, description: 'Id of category' })
  @IsNumber()
  category_id: number;
}
