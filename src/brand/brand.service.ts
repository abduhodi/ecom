import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './models/brand.model';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand) private brandRepo: typeof Brand) {}

  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandRepo.create(createBrandDto);
    if (!brand) {
      throw new BadRequestException('Error while creating brand');
    }
    return { message: 'Created successfully', brand };
  }

  async findAll() {
    const brands = await this.brandRepo.findAll();
    return { brands };
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findByPk(id);
    if (!brand) {
      throw new NotFoundException('Brand not found with such id');
    }
    return { brand };
  }

  async update(id: number, updatebrandDto: UpdateBrandDto) {
    const brand = await this.brandRepo.findByPk(id);
    if (!brand) {
      throw new NotFoundException('Brand not found with such id');
    }
    const updated = await this.brandRepo.update(
      { ...updatebrandDto },
      {
        where: { id },
        returning: true,
      },
    );
    if (!updated[0]) {
      throw new BadRequestException('Error, please check before you update');
    }
    return {
      message: 'Updated successfully',
      brand: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findByPk(id);
    if (!brand) {
      throw new NotFoundException('Brand not found with such id');
    }
    await brand.destroy();
    return { message: 'Deleted successfully' };
  }
}
