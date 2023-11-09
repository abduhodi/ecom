import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PhoneNumberDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998\d{9}$/, { message: 'Invalid phone number format' })
  phone_number: string;
}
