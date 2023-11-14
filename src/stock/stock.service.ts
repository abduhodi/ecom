// stock.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './models/stock.model';
import { Product } from '../product/models/product.model';
import { RemoveStockDto } from './dto/remove-stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(Stock)
    private readonly stockModel: typeof Stock,
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const product = await this.productModel.findByPk(createStockDto.product_id);
    if (!product) {
      throw new NotFoundException('Product with such id is not found');
    }

    let stockInDb: Stock;

    stockInDb = await this.stockModel.findOne({
      where: { id: createStockDto.product_id },
    });

    if (!stockInDb) {
      stockInDb = await this.stockModel.create(createStockDto);
    } else {
      stockInDb.quantity_in_stock += createStockDto.quantity_in_stock;
      stockInDb.save();
    }

    return stockInDb;
  }

  async removeFromStock(removeStockDto: RemoveStockDto) {
    const product = await this.productModel.findByPk(removeStockDto.product_id);
    if (!product) {
      throw new NotFoundException('Product with such id is not found');
    }

    const prodInStock = await this.stockModel.findOne({
      where: { product_id: removeStockDto.product_id },

      include: { all: true },
    });
    if (!prodInStock) {
      throw new NotFoundException('There is no such a product in stock');
    }
    if (removeStockDto.quantity > prodInStock.quantity_in_stock) {
      throw new BadRequestException('There is no enough product');
    }

    prodInStock.quantity_in_stock -= removeStockDto.quantity;
    await prodInStock.save();

    return prodInStock;
  }

  async findAll(): Promise<Stock[]> {
    return this.stockModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Stock | null> {
    return this.stockModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    const stock = await this.stockModel.findOne({ where: { id: id } });
    if (!stock) throw new NotFoundException('Stock is not found');
    stock.update(updateStockDto);
    await stock.save();
    return stock;
  }

  async remove(id: number): Promise<number> {
    const result = await this.stockModel.destroy({ where: { id } });
    return result;
  }
}
