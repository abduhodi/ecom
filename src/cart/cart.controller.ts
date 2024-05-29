import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { StorageGetter } from '../decorators/storageGetter-cookie.decorator.ts';
import { Request, Response, response } from 'express';
import { CreateOrderAddressDto } from '../order_address/dto/create-order_address.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';


@ApiTags('Cart')
@ApiBearerAuth()
// @UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new cart' })
  @Post()
  create(
    @Body() createCartDto: CreateCartDto,
    @StorageGetter() token: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // console.log('token controller', token);
    return this.cartService.create(createCartDto, token, req, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Get all carts' })
  @Get('all')
  findAll() {
    return this.cartService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.USER)
  @ApiOperation({ summary: 'Get a cart by ID' })
  @Get()
  findOne(
    @StorageGetter() token: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.cartService.findOne(token, req, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.USER)
  @Post('order')
  @ApiOperation({})
  order(
    @Body() createAddressDto: CreateOrderAddressDto,
    // @CookieGetter('refresh_token') token: string,
    @StorageGetter() token: string,
  ) {
    return this.cartService.ordering(createAddressDto, token);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.USER)
  @ApiOperation({ summary: 'Update a cart by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Delete a cart by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
