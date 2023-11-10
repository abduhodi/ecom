import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Attribute } from './models/attribute.model';

@Injectable()
export class AttributesService {
  constructor(@InjectModel(Attribute) private attributeRepo: typeof Attribute) {}

  async create(createAttributeDto: CreateAttributeDto) {
    const attribute = await this.attributeRepo.create(createAttributeDto);
    if (!attribute) {
      throw new BadRequestException('Error while creating attribute');
    }
    return { message: 'Created successfully', attribute };
  }

  async findAll() {
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
}
