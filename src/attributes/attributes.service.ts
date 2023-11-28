import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Attribute } from './models/attribute.model';
import { AttributeGroup } from '../attribute_group/models/attribute_group.model';

@Injectable()
export class AttributesService {
  constructor(
    @InjectModel(Attribute) private attributeRepo: typeof Attribute,
    @InjectModel(AttributeGroup)
    private attributeGroupRepo: typeof AttributeGroup,
  ) {}

  async create(createAttributeDto: CreateAttributeDto) {
    const attribute = await this.attributeRepo.create(createAttributeDto);
    if (!attribute) {
      throw new BadRequestException('Error while creating attribute');
    }
    return { message: 'Created successfully', attribute };
  }

  async checkChangable(attr_id: number) {
    const attr = await this.attributeRepo.findOne({ where: { id: attr_id } });
    if (attr && attr.is_changable) {
      return true;
    }
    return false;
  }

  async findAll() {
    console.log('Here');
    const attributes = await this.attributeRepo.findAll();
    return { attributes };
  }

  async findOne(id: number) {
    const attribute = await this.attributeRepo.findByPk(id);
    if (!attribute) {
      throw new NotFoundException('Attribute not found with such id');
    }
    return { attribute };
  }

  async update(id: number, updateAttributeDto: UpdateAttributeDto) {
    const attribute = await this.attributeRepo.findByPk(id);
    if (!attribute) {
      throw new NotFoundException('Attribute not found with such id');
    }
    const updated = await this.attributeRepo.update(
      { ...updateAttributeDto },
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
      attribute: updated[1][0].dataValues,
    };
  }

  async remove(id: number) {
    const attribute = await this.attributeRepo.findByPk(id);
    if (!attribute) {
      throw new NotFoundException('Attribute not found with such id');
    }
    await attribute.destroy();
    return { message: 'Deleted successfully' };
  }

  async findAttributeByCategoryId(
    category_id: number,
    is_changable: boolean = null,
  ) {
    const attributeGroups = await this.attributeGroupRepo.findAll({
      where: {
        category_id: category_id,
      },
    });

    let attributes: Attribute[] = [];
    for (const attGroup of attributeGroups) {
      let attrs: Attribute[] = [];
      if (is_changable == null) {
        attrs = await this.attributeRepo.findAll({
          where: {
            attribute_group_id: attGroup.dataValues.id,
          },
        });
      } else {
        attrs = await this.attributeRepo.findAll({
          where: {
            attribute_group_id: attGroup.dataValues.id,
            is_changable: is_changable,
          },
        });
      }

      attributes.push(...attrs);
    }

    return attributes;
  }
}
