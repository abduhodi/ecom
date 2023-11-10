import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The first name of the user.' })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The last name of the user.' })
  last_name: string;

  @IsEmail()
  @ApiProperty({ description: 'The email address of the user (optional).' })
  email?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The check number for verification.',
    example: '+998989909090',
  })
  @Matches(/^\+998\d{9}$/, { message: 'Invalid phone number format' })
  phone_number: string;
}
