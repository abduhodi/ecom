import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { RemoveStockDto } from './dto/remove-stock.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';

@ApiTags("Stock")
@ApiBearerAuth()
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('create')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Delete('decrease')
  removeFromStock(@Body() removeStockDto: RemoveStockDto) {
    return this.stockService.removeFromStock(removeStockDto);
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
