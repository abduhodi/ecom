import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetByModel {
  @ApiProperty({ example: 1, description: 'Id of model' })
  @IsNumber()
  model_id: number;
}
