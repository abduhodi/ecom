import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateOrderAddressDto {
  @ApiProperty({ example: '123 Main St', description: 'Street address' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: '12345', description: 'ZIP Code' })
  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @ApiProperty({
    example: '123-456-7890',
    description: 'Phone Number',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  district_id: number;
}
