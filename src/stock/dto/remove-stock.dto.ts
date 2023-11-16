import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class RemoveStockDto {
  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Quantity cannot be negative number' })
  quantity: number;
}
