import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductViewDto } from './dto/create-product_view.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductView } from './models/product_view.model';
import { JwtService } from '@nestjs/jwt';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ProductViewService {
  constructor(
    @InjectModel(ProductView)
    private readonly viewModel: typeof ProductView,
    private jwtService: JwtService,
  ) {}

  async create(createProductViewDto: CreateProductViewDto, user_id: string) {
    try {
      const { product_id } = createProductViewDto;
      const view = await this.viewModel.findOne({
        where: { user_id, product_id },
      });
      if (view) {
        return view;
      }
      const new_view = await this.viewModel.create({
        user_id,
        product_id,
        view_date: new Date(),
      });
      return new_view;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findMostPopular() {
    const products = await this.viewModel.findAll({
      attributes: [
        'product_id',
        [Sequelize.fn('COUNT', 'product_id'), 'view_count'],
      ],
      group: ['product_id'],
      order: [[Sequelize.literal('view_count'), 'DESC']],
      limit: 15,
    });
    return products;
  }

  async findLastViewed(user_id: string) {
    const last_viewed = await this.viewModel.findAll({
      where: { user_id },
      order: [[Sequelize.literal('view_date'), 'DESC']],
      limit: 15,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return last_viewed;
  }
}
