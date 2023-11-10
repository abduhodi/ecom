import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'The first name of the admin.',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'The last name of the admin.',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'The phone number of the admin for verification.',
    example: '+998989909090',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998\d{9}$/, { message: 'Invalid phone number format' })
  phone_number: string;

  @ApiProperty({
    description: 'The email address of the admin.',
    example: 'admin@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for the admin account.',
    example: 'securePassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
