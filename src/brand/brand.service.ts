import { GetByCategory } from './../product/dto/get-by-category.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './models/brand.model';
import { BrandCategory } from '../brand_category/models/brand_category.model';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand) private brandRepo: typeof Brand,
    @InjectModel(BrandCategory) private brandCategoryRepo: typeof BrandCategory,
    private fileService: FilesService,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      const brand = await this.brandRepo.create({
        ...createBrandDto,
      });

      if (!brand) {
        throw new BadRequestException('Error while creating brand');
      }
      return { message: 'Created successfully', brand };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(limit: number, page: number) {
    limit = limit > 0 ? limit : null;
    page = page > 0 ? page : 1;
    const brands = await this.brandRepo.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit,
      offset: (page - 1) * limit,
    });
    const count = await this.brandRepo.count();
    return { count, brands };
  }

  async findByCategoryId(getByCategory: GetByCategory) {
    const { category_id } = getByCategory;
    const brandCategory = await this.brandCategoryRepo.findAll({
      where: { category_id: category_id },
    });

    const brandIds = brandCategory.map((oneId) => oneId.dataValues?.brand_id);

    const brands = await this.brandRepo.findAll({
      where: {
        id: {
          [Op.in]: brandIds,
        },
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return brands;
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!brand) {
      throw new NotFoundException('Brand not found with such id');
    }
    return brand;
  }

  async update(id: number, updatebrandDto: UpdateBrandDto) {
    Object.defineProperty(updatebrandDto, 'id', { enumerable: false });
    const brand = await this.brandRepo.findByPk(id);
    if (!brand) {
      throw new NotFoundException('Brand not found with such id');
    }
    // const updated = await brand.update(updatebrandDto);
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
      // brand: updated,
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
