import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The check number for verification.',
    example: '+998989909090',
  })
  @Matches(/^\+998\d{9}$/, { message: 'Invalid phone number format' })
  phone_number: string;
}
