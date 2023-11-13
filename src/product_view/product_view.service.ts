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

  async create(
    createProductViewDto: CreateProductViewDto,
    accessToken: string,
  ) {
    try {
      const payload = this.jwtService.decode(accessToken);
      const { product_id } = createProductViewDto;
      const view = await this.viewModel.findOne({
        //@ts-ignore
        where: { user_id: payload.id, product_id },
      });
      if (view) {
        return view;
      }
      const new_view = await this.viewModel.create({
        //@ts-ignore
        user_id: payload.id,
        product_id: createProductViewDto.product_id,
        view_date: new Date(),
      });
      return new_view;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all productView`;
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
}
