import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
// import { Product } from '../product/model/product.model';
// import { ProductService } from '../product/product.service';
import { Session } from '../session/models/session.model';
import { SessionService } from '../session/session.service';
import { CreateSessionItemDto } from './dto/create-session_item.dto';
import { UpdateSessionItemDto } from './dto/update-session_item.dto';
import { SessionItem } from './model/session_item.model';

@Injectable()
export class SessionItemsService {
  constructor(
    @InjectModel(SessionItem) private sessionCartRepository: typeof SessionItem,
    @InjectModel(Session) private sessionService: typeof Session, // @InjectModel(Product) private productService: typeof Product,
  ) {}

  async create(createSessionCartDto: CreateSessionItemDto, cookie: string) {
    // const product = await this.productService.findOne({
    //   where: { id: createSessionCartDto.product_id },
    // });
    // const uniqueCartId = await this.sessionService.findOne({
    //   where: { session_unique_id: cookie },
    // });
    // const price = product.price * createSessionCartDto.quantity;
    // const sessionInput = {
    //   session_id: uniqueCartId.cart_unique_id,
    //   product_id: createSessionCartDto.product_id,
    //   quantity: createSessionCartDto.quantity,
    //   subtotal: price,
    // };
    // const sessionCart = await this.sessionCartRepository.create(sessionInput);
    // return sessionCart;
  }

  async findAll(): Promise<SessionItem[]> {
    const sessionCarts = await this.sessionCartRepository.findAll({
      include: { all: true },
    });
    return sessionCarts;
  }

  async findOne(id: number): Promise<SessionItem> {
    const sessionCart = await this.sessionCartRepository.findOne({
      where: { id },
    });
    return sessionCart;
  }

  async findItems(id: string): Promise<SessionItem[]> {
    const sessionCart = await this.sessionCartRepository.findAll({
      where: { session_id: id },
      include: { all: true },
    });
    return sessionCart;
  }

  async update(
    id: number,
    updateSessionCartDto: UpdateSessionItemDto,
  ): Promise<[number, SessionItem[]]> {
    const updatedSessionCarts = await this.sessionCartRepository.update(
      updateSessionCartDto,
      { where: { id }, returning: true },
    );
    return updatedSessionCarts;
  }

  async remove(id: number): Promise<number> {
    const deletedSessionCarts = await this.sessionCartRepository.destroy({
      where: { id },
    });
    return deletedSessionCarts;
  }
  async destroy() {
    return this.sessionCartRepository.destroy({
      where: { id: { [Op.gte]: 0 } },
    });
  }
}
