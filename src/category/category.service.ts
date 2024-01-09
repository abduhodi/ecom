import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.create(createCategoryDto);
    if (!category) {
      throw new BadRequestException('Error while creating category');
    }
    return { message: 'Created successfully', category };
  }

  async findAllCategory(limit: number, page: number) {
    limit = limit > 0 ? limit : null;
    page = page > 0 ? page : 1;
    const categories = await this.categoryRepo.findAll({
      where: { parent_category_id: null },
      include: { all: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit,
      offset: (page - 1) * limit,
      order: ['position'],
    });
    const count = await this.categoryRepo.count({
      where: { parent_category_id: null },
    });
    return { count, categories };
  }

  async findAllSubcategory(id: number, limit: number, page: number) {
    limit = limit > 0 ? limit : null;
    page = page > 0 ? page : 1;
    const categories = await this.categoryRepo.findAll({
      where: { parent_category_id: id },
      include: { all: true },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit,
      offset: (page - 1) * limit,
      order: ['position'],
    });
    const count = await this.categoryRepo.count({
      where: { parent_category_id: { [Op.ne]: null } },
    });
    return { count, categories };
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!category) {
      throw new NotFoundException('Category not found with such id');
    }
    return category;
  }

  async update(id: number, updatecategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findByPk(id);
    if (!category) {
      throw new NotFoundException('Category not found with such id');
    }
    const updated = await this.categoryRepo.update(
      { ...updatecategoryDto },
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
      category: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findByPk(id);
    if (!category) {
      throw new NotFoundException('Category not found with such id');
    }
    await category.destroy();
    return { message: 'Deleted successfully' };
  }
}
