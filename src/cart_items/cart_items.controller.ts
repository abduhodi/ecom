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
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { CreateAddressDto } from '../address/dto/create-address.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
// import { JwtGuard } from '../guards/jwt.guard';
// import { AdminGuard } from '../guards/admin.guard';
// import { SelfGuard } from '../guards/user-self.guard';
// import { UserGuard } from '../guards/user.guard';
// import { User2Guard } from '../guards/user2.guard';

@Controller('cart-items')
// @UseGuards(JwtGuard)
@ApiTags('Cart Items') 
export class CartItemsController {
  constructor(
    private readonly cartItemsService: CartItemsService,
  ) {}

  // @UseGuards(User2Guard)
  @Post()
  @ApiOperation({ summary: 'Create a new cart item' })
  create(@Body() createCartItemDto: CreateCartItemDto) {
    // return this.cartItemsService.create(createCartItemDto);
  }

  // @Post(':id/order')
  // @ApiOperation({})
  // order(
  //   @Param('id') id: string,
  //   @Body() createAddressDto: CreateAddressDto,
  //   @CookieGetter() token: string,
  // ) {
  //   return this.cartItemsService.ordering(+id, createAddressDto,token);
  // }

  // @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  findAll() {
    // return this.cartItemsService.findAll();
  }

  // @UseGuards(SelfGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  findOne(@Param('id') id: string) {
    // return this.cartItemsService.findOne(+id);
  }

  // @UseGuards()
  // @Patch(':id')
  // @ApiOperation({ summary: 'Update a cart item by ID' })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCartItemDto: UpdateCartItemDto,
  // ) {
  //   return this.cartItemsService.update(+id, updateCartItemDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item by ID' })
  remove(@Param('id') id: string) {
    // return this.cartItemsService.remove(+id);
  }
}
