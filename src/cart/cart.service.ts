import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { OrderAddressService } from '../order_address/order_address.service';

import { CreateOrderAddressDto } from '../order_address/dto/create-order_address.dto';
// import { CartItemsService } from '../cart_items/cart_items.service';
import { OrderItem } from '../order_items/models/order_item.model';
import { OrderItemsService } from '../order_items/order_items.service';
import { User } from '../user/models/user.model';
import { OrderService } from '../order/order.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './models/cart.model';
import * as uuid from 'uuid';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';

import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartRepository: typeof Cart,
    private readonly addressService: OrderAddressService,
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemsService,
    private readonly jwtService: JwtService,
    private readonly productService: ProductService,
    // private readonly cartItemService: CartItemsService,
    private readonly userService: UserService,
  ) {}

  async create(
    createCartDto: CreateCartDto,
    token: string,
    req: Request,
    res: Response,
  ): Promise<Cart> {
    let decodedToken: Partial<User>, error: Error;
    try {
      decodedToken = await this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (err) {
      error = err;
    }

    if (!token) {
      const userId = req.cookies['user_id'];
      if (!userId) {
        const unique = uuid.v4();
        console.log(typeof unique);
        res.cookie('user_id', unique);
        const cart = await this.cartRepository.create({
          ...createCartDto,
          user_id: unique,
        });
        return cart;
      } else {
        console.log(typeof userId);
        const cart = await this.cartRepository.create({
          ...createCartDto,
          user_id: userId,
        });
        return cart;
      }
    } else {
      const ID = await this.userService.findOne(decodedToken.id);
      if (!ID) {
        throw new NotFoundException('There is not such user');
      }
      // console.log(ID);
      // const findCart = await this.cartRepository.findOne({
      //   where: { user_id: ID.id },
      // });

      const cart = await this.cartRepository.create({
        ...createCartDto,
        user_id: ID.id.toString(),
      });
      return cart;
    }
  }

  async ordering(createAddressDto: CreateOrderAddressDto, token: string) {
    let decodedToken: Partial<User>, error: Error;
    try {
      decodedToken = await this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (err) {
      error = err;
    }

    if (error) {
      if (error.message !== 'jwt expired') {
        throw new BadRequestException('Jwt modified');
      }
      throw new UnauthorizedException('Need login action');
    }

    const addressDto = {
      street: createAddressDto.street,
      zip_code: createAddressDto.zip_code,
      phone_number: createAddressDto.phone_number,
      district_id: createAddressDto.district_id,
    };

    const address = await this.addressService.create(addressDto);

    // const cartID = await this.cartItemRepository.findByPk(id);

    const cart = await this.cartRepository.findAll({
      where: { user_id: decodedToken.id.toString() },
      include: { all: true },
    });
    console.log('cart', cart);
    // return { cart };
    // const cartItems = await this.cartRepository.findOne({
    //   where: { id: ID.id },
    //   include: { all: true },
    // });

    const productIds = cart.map((cartItem) => cartItem.product_id);
    const quantities = cart.map((cartItem) => cartItem.quantity);
    console.log(productIds, quantities);
    const combinedCartItems = [];

    for (let i = 0; i < cart.length; i++) {
      const newCartItem = {
        product_id: productIds[i],
        quantity: quantities[i],
      };

      combinedCartItems.push(newCartItem);
    }
    console.log(combinedCartItems);

    // // const userID = await this.cartService.findOne(cartID.cart_id);
    // let total = 0;
    // await Promise.all([
    //   combinedCartItems.forEach(async (el) => {
    //     console.log('combinedCartItems', el);
    //     const price = await this.productService.findOne(Number(el.product_id));
    //     console.log(price.product.price);
    //     total += el.quantity * price.product.price;
    //     console.log('total', total);
    //   }),
    // ]);

    // console.log('total', total);
    const total = await this.calculateTotal(combinedCartItems);
    console.log('total', total);

    const date = new Date(Date.now());
    // let info: OrderItem;
    const createOrder = {
      user_id: decodedToken.id,
      order_date: date,
      order_status: 'Processing',
      total_amount: total,
      address_id: address.id,
    };
    const order = await this.orderService.create(createOrder);

    for (const cartItem of combinedCartItems) {
      console.log(cartItem);
      console.log(cartItem.quantity);
      // const subtotal = cartItem.quantity * cartItem.subtotal;

      const orderItem = {
        productId: cartItem.product_id,
        quantity: cartItem.quantity,
        // subtotal: cartItem.subtotal,
        orderId: order.id,
      };

      await this.orderItemService.create(orderItem);
    }
    const info = await this.orderService.findOne(order.id);
    await this.cartRepository.destroy({
      where: { user_id: decodedToken.id.toString() },
    });
    return {
      message: 'Your order infos',
      info,
    };
  }

  async calculateTotal(combinedCartItems: any) {
    let total = 0;

    for (const el of combinedCartItems) {
      const price = await this.productService.findById(Number(el.product_id));
      total += el.quantity * price.price;
    }

    // console.log('total', total);
    return total;
  }

  async findAll() {
    const carts = await this.cartRepository.findAll({ include: { all: true } });

    return carts;
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async find(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user_id: id },
    });
    return cart;
  }

  async update(
    id: number,
    updateCartDto: UpdateCartDto,
  ): Promise<[number, Cart[]]> {
    const updatedCarts = await this.cartRepository.update(updateCartDto, {
      where: { id },
      returning: true,
    });
    return updatedCarts;
  }

  async remove(id: number): Promise<number> {
    const deletedCarts = await this.cartRepository.destroy({
      where: { id },
    });
    return deletedCarts;
  }
}
