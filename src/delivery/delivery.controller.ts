import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Delivery')
@ApiBearerAuth()
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @ApiOperation({ summary: 'Add delivery' })
  @Post('add')
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }
  @ApiOperation({ summary: 'Get all deliverys' })
  @Get('get-all')
  findAll() {
    return this.deliveryService.findAll();
  }

  @ApiOperation({ summary: 'Get delivery by id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update delivery by id' })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @ApiOperation({ summary: 'Delete delivery by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(+id);
  }
}
