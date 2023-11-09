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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
// import { CreateAddressDto } from '../address/dto/create-address.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
// import { JwtGuard } from '../guards/jwt.guard';
// import { AdminGuard } from '../guards/admin.guard';
// import { SelfGuard } from '../guards/user-self.guard';

@ApiTags('Cart')
// @UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create a new cart' })
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all carts' })
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  // @UseGuards(SelfGuard)
  @ApiOperation({ summary: 'Get a cart by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Post(':id/order')
  @ApiOperation({})
  order(
    // @Body() createAddressDto: CreateAddressDto,
    @CookieGetter('refresh_token') token: string,
  ) {
    // return this.cartService.ordering(createAddressDto, token);
  }

  // @UseGuards(SelfGuard)
  @ApiOperation({ summary: 'Update a cart by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete a cart by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
