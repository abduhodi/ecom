import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { JwtGuard } from '../guards/jwt.guard';
// import { AdminGuard } from '../guards/admin.guard';

// @UseGuards(JwtGuard)
@ApiTags('Order')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly zakazService: OrderService) {}

  @Post()
  create(@Body() createZakazDto: CreateOrderDto) {
    return this.zakazService.create(createZakazDto);
  }

  // @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.zakazService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zakazService.findOne(+id);
  }

  // @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZakazDto: UpdateOrderDto) {
    return this.zakazService.update(+id, updateZakazDto);
  }

  // @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zakazService.remove(+id);
  }
}
