import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './models/sale.model';

@Injectable()
export class SaleService {
  constructor(@InjectModel(Sale) private readonly saleModel: typeof Sale) {}
  create(createSaleDto: CreateSaleDto) {
    // const model = await this.modelModel.find({
    //   where: { id: createSaleDto.model_id },
    // });
    // if (!model) {
    //   throw new NotFoundException(
    //     `Model with id ${createSaleDto.model_id} is not found`,
    //   );
    // }

    



  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
