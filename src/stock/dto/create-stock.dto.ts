import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Quantity cannot be negative number' })
  quantity: number;
}
