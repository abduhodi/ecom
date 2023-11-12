import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('create')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get('get-all')
  findAll() {
    return this.stockService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
