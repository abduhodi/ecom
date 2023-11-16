import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetAttrebuteDto {
  @ApiProperty({ example: 1, description: 'Id of the category' })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({ example: 1, description: 'Id of the model' })
  @IsNumber()
  @IsNotEmpty()
  model_id: number;
}
