import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { SaleStatus } from '../../common/types/sale-status.type';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsNumber()
  model_id: number;

  @IsDateString()
  sale_start_date: Date;
  @IsDateString()
  sale_end_date: Date;

  @IsNotEmpty()
  @IsString()
  sale_status: SaleStatus;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Sale percentage have to be at least 1%' })
  @Max(100, { message: 'Sale percentage cannot be less than 100%' })
  sale_percentage: number;
}

