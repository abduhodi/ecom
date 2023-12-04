import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttributeGroupDto } from './dto/create-attribute_group.dto';
import { UpdateAttributeGroupDto } from './dto/update-attribute_group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AttributeGroup } from './models/attribute_group.model';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class AttributeGroupService {
  constructor(
    @InjectModel(AttributeGroup)
    private attributeGroupRepo: typeof AttributeGroup,
    private categoryService: CategoryService,
  ) {}

  async create(createAttributeGroupDto: CreateAttributeGroupDto) {
    const category = await this.categoryService.findOne(
      createAttributeGroupDto.category_id,
    );
    if (!category) {
      throw new NotFoundException('Category not found with such id');
    }
    const attributeGroup = await this.attributeGroupRepo.create(
      createAttributeGroupDto,
    );
    if (!attributeGroup) {
      throw new BadRequestException('Error while creating attributeGroup');
    }
    return { message: 'Created successfully', attributeGroup };
  }

  async findAll() {
    const attributeGroups = await this.attributeGroupRepo.findAll();
    return { attributeGroups };
  }

  async findOne(id: number) {
    const attributeGroup = await this.attributeGroupRepo.findByPk(id);
    if (!attributeGroup) {
      throw new NotFoundException('AttributeGroup not found with such id');
    }
    return { attributeGroup };
  }

  async findByCategoryId(id: number) {
    const attributeGroup = await this.attributeGroupRepo.findAll({
      where: { category_id: id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!attributeGroup.length) {
      throw new NotFoundException('Not found with such category_id');
    }
    return attributeGroup;
  }

  async update(id: number, updateAttributeGroupDto: UpdateAttributeGroupDto) {
    const attributeGroup = await this.attributeGroupRepo.findByPk(id);
    if (!attributeGroup) {
      throw new NotFoundException('AttributeGroup not found with such id');
    }
    const updated = await this.attributeGroupRepo.update(
      { ...updateAttributeGroupDto },
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
      attributeGroup: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const attributeGroup = await this.attributeGroupRepo.findByPk(id);
    if (!attributeGroup) {
      throw new NotFoundException('AttributeGroup not found with such id');
    }
    await attributeGroup.destroy();
    return { message: 'Deleted successfully' };
  }
}
