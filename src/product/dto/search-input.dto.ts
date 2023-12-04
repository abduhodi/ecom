import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class SearchInput {
  @IsString()
  @IsNotEmpty()
  search_input: string;
}
