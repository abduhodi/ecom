import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateAdsDto {
  @ApiProperty({ example: 1, description: 'Id of model' })
  @IsNotEmpty()
  @IsNumberString()
  model_id: number;

  title: string;

  description: string;
}
