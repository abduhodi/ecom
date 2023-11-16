import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ProductService } from '../product/product.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
// import { CartItem } from './models/cart_item.model';

@Injectable()
export class CartItemsService {
  // constructor(
  //   @InjectModel(CartItem)
  //   private cartItemRepository: typeof CartItem,
  //   private readonly productService: ProductService,
  // ) {}
  // async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
  //   const product = await this.productService.findOne(
  //     createCartItemDto.product_id,
  //   );
  //   const price = product.product.price * createCartItemDto.quantity;
  //   console.log(product);
  //   const createCartItem = {
  //     ...createCartItemDto,
  //     subtotal: price,
  //   };
  //   const cartItem = await this.cartItemRepository.create(createCartItem);
  //   return cartItem;
  // }
  // async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
  //   const product = await this.productService.findById(
  //     createCartItemDto.product_id,
  //   );
  //   const price = product.price * createCartItemDto.quantity;
  //   console.log(product);
  //   const createCartItem = {
  //     ...createCartItemDto,
  //     subtotal: price,
  //   };
  //   const cartItem = await this.cartItemRepository.create(createCartItem);
  //   return cartItem;
  // }
  // async findAll() {
  //   const cartItems = await this.cartItemRepository.findAll({
  //     include: { all: true },
  //   });
  //   return cartItems;
  // }
  // async findCarts(id: number) {
  //   const cartItems = await this.cartItemRepository.findAll({
  //     where: { cart_id: id },
  //     include: { all: true },
  //   });
  //   return cartItems;
  // }
  // async destroy() {
  //   return this.cartItemRepository.destroy({
  //     where: { id: { [Op.gte]: 0 } },
  //   });
  // }
  // async findOne(id: number): Promise<CartItem> {
  //   const cartItem = await this.cartItemRepository.findOne({
  //     where: { id },
  //   });
  //   return cartItem;
  // }
  // async update(
  //   id: number,
  //   updateCartItemDto: UpdateCartItemDto,
  // ): Promise<[number, CartItem[]]> {
  //   const updatedCartItems = await this.cartItemRepository.update(
  //     updateCartItemDto,
  //     { where: { id }, returning: true },
  //   );
  //   return updatedCartItems;
  // }
  // async remove(id: number): Promise<number> {
  //   const deletedCartItems = await this.cartItemRepository.destroy({
  //     where: { id },
  //   });
  //   return deletedCartItems;
  // }
}
