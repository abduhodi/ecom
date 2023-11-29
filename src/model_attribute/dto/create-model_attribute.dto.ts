import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModelAttributeDto {
  @ApiProperty({ example: 1, description: 'The ID of the model' })
  @IsNotEmpty()
  @IsNumber()
  model_id: number;

  @ApiProperty({ example: 1, description: 'The ID of the attribute' })
  @IsNotEmpty()
  @IsNumber()
  attribute_id: number;

  @ApiProperty({
    example: ['value1', 'value2'],
    description:
      'The value of the attribute as a string or an array of strings',
  })
  @IsNotEmpty()
  attribute_value: string[] | string;

  @ApiProperty({
    example: true,
    description: 'Specifies whether the attribute is changable',
  })
  @IsBoolean()
  is_changable: boolean;
}
