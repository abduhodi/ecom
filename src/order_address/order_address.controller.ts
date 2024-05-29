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
import { OrderAddressService } from './order_address.service';
import { CreateOrderAddressDto } from './dto/create-order_address.dto';
import { UpdateOrderAddressDto } from './dto/update-order_address.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { JwtGuard } from '../guards/jwt.guard';

// @UseGuards(JwtGuard)
@ApiTags('Address')
@ApiBearerAuth()
@Controller('address')
export class OrderAddressController {
  constructor(private readonly addressService: OrderAddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  create(@Body() createAddressDto: CreateOrderAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an address by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Address ID' })
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an address by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Address ID' })
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateOrderAddressDto,
  ) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an address by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Address ID' })
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
