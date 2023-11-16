import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({ example: false, description: 'has it arrived' })
  @IsBoolean()
  delivered: boolean;

  @ApiProperty({ example: 1, description: 'Id of Order' })
  order_id: number;
}
