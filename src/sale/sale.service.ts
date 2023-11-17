import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './models/sale.model';
import { SaleStatus } from '../common/types/sale-status.type';
import { Product } from '../product/models/product.model';
import { ProductModel } from '../product_model/model/product_model.model';
import { formatDate } from '../common/helpers/formatDate';
import { Op } from 'sequelize';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale) private readonly saleModel: typeof Sale,
    @InjectModel(Product) private readonly productModel: typeof Product,
    @InjectModel(ProductModel)
    private readonly productModelRepo: typeof ProductModel,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { sale_start_date, sale_end_date } = createSaleDto;
    const today = new Date();
    const model_id = createSaleDto.model_id;

    await this.validateModelId(model_id);

    const checkSale = await this.saleModel.findOne({
      where: { model_id: model_id },
    });

    if (checkSale) {
      throw new BadRequestException('Sale already exists');
    }

    await this.validateSaleDates(checkSale, sale_start_date, sale_end_date);

    const newSale = await this.saleModel.create(createSaleDto);

    return newSale;
  }

  async EndSale() {
    const now: Date = new Date();
    const today = formatDate(now);

    const endedSales = await this.saleModel.findAll({
      where: {
        [Op.or]: [
          {
            sale_end_date: {
              [Op.lt]: today,
            },
          },
          {
            sale_start_date: {
              [Op.gt]: today,
            },
          },
        ],
      },
    });

    for (const sale of endedSales) {
      await sale.update({ sale_status: SaleStatus.ended });

      const model = await this.productModelRepo.findOne({
        where: { id: sale.model_id },
      });

      const products = await this.productModel.findAll({
        where: { model_id: sale.model_id },
      });

      for (const product of products) {
        await product.update({
          sale_price: null,
        });
      }
    }
  }

  async checkAndSetSale() {
    const now: Date = new Date();
    const today = formatDate(now);

    const upcomingSales = await this.saleModel.findAll({
      where: {
        sale_start_date: {
          [Op.lte]: today,
        },
        sale_end_date: {
          [Op.gte]: today,
        },
      },
    });

    for (const sale of upcomingSales) {
      await sale.update({ sale_status: SaleStatus.active });

      const model = await this.productModelRepo.findOne({
        where: { id: sale.model_id },
      });

      const products = await this.productModel.findAll({
        where: { model_id: sale.model_id },
      });

      for (const product of products) {
        await product.update({
          sale_price: this.calculateSalePrice(
            product.price,
            sale.sale_percentage,
          ),
        });
      }
    }
    await this.EndSale();
  }

  private calculateSalePrice(
    originalPrice: number,
    percentage: number,
  ): number {
    const discount = (percentage / 100) * originalPrice;
    return originalPrice - discount;
  }

  async findAll() {
    await this.checkAndSetSale();
    const allSales = await this.saleModel.findAll({ include: { all: true } });
    return allSales;
  }

  async findInSale() {
    await this.checkAndSetSale();
    const allSales = await this.saleModel.findAll({
      where: {
        sale_status: SaleStatus.active,
      },
      include: { all: true },
    });
    return allSales;
  }

  async findOne(id: number) {
    await this.checkAndSetSale();
    const sale = await this.saleModel.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!sale) {
      throw new NotFoundException('Not found');
    }

    return sale;
  }

  async remove(id: number) {
    const sale = await this.saleModel.findOne({ where: { id: id } });
    if (!sale) {
      throw new NotFoundException('Sale is not found');
    }
    await sale.destroy();

    return { msg: 'Succesfully deleted' };
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    let { sale_start_date, sale_end_date } = updateSaleDto;

    if (sale_start_date) {
      sale_start_date = new Date(sale_start_date);
    }

    if (sale_end_date) {
      sale_end_date = new Date(sale_end_date);
    }

    const checkSale = await this.saleModel.findOne({
      where: { id: id },
    });

    if (updateSaleDto.model_id) {
      await this.validateModelId(updateSaleDto.model_id);
    }

    await this.validateSaleDates(checkSale, sale_start_date, sale_end_date);

    await checkSale.update(updateSaleDto);
    await checkSale.save();

    return checkSale;
  }

  // * <  Validate date and Model > * //
  private async validateSaleDates(
    sale: Sale,
    sale_start_date?: Date,
    sale_end_date?: Date,
  ) {
    const today = new Date();
    if (sale_start_date && !sale_end_date) {
      if (sale_start_date >= sale.sale_end_date) {
        throw new BadRequestException(
          'Sale start date must be earlier than sale end date',
        );
      }
      if (sale_start_date < today) {
        throw new BadRequestException('Sale must start at least today');
      }
    } else if (sale_start_date && sale_end_date) {
      if (sale_start_date >= sale_end_date) {
        throw new BadRequestException(
          'Sale start date must be earlier than sale end date',
        );
      }
      if (sale_start_date < today) {
        throw new BadRequestException('Sale must start at least today');
      }
    } else if (!sale_start_date && sale_end_date) {
      if (sale_end_date <= sale.sale_start_date) {
        throw new BadRequestException(
          'Sale start date must be earlier than sale end date',
        );
      }
    }
  }
  private async validateModelId(model_id: number) {
    const model = await this.productModelRepo.findOne({
      where: { id: model_id },
    });

    if (!model) {
      throw new NotFoundException(`Model with id ${model_id} is not found`);
    }
  }

  // * <  Validate date and Model /> * //
}
