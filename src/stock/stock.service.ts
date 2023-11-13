// stock.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './models/stock.model';
import { Product } from '../product/models/product.model';

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

  

  async findAll(): Promise<Stock[]> {
    return this.stockModel.findAll();
  }

  async findOne(id: number): Promise<Stock | null> {
    return this.stockModel.findByPk(id);
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
