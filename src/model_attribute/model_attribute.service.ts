import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelAttributeDto } from './dto/create-model_attribute.dto';
import { UpdateModelAttributeDto } from './dto/update-model_attribute.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ModelAttribute } from './models/model_attribute.model';
import { GetAttributeDto } from './dto/get-attribute.dto';
import { Attribute } from '../attributes/models/attribute.model';

@Injectable()
export class ModelAttributeService {
  constructor(
    @InjectModel(ModelAttribute)
    private readonly modelAttributeRepo: typeof ModelAttribute,
  ) {}

  async create(createModelAttributeDto: CreateModelAttributeDto) {
    const { model_id, attribute_id, attribute_value, is_changable } =
      createModelAttributeDto;

    const newModelAttr: ModelAttribute = await this.modelAttributeRepo.create({
      model_id,
      attribute_id,
      is_changable,
      attribute_value: Array.isArray(attribute_value)
        ? attribute_value
        : [attribute_value],
    });

    return newModelAttr;
  }

  async findAll() {
    const attributes = await this.modelAttributeRepo.findAll({
      include: { model: Attribute, attributes: ['name'] },
    });

    return attributes;
  }

  async getModelAttributes(getAttributeDto: GetAttributeDto) {
    const { model_id } = getAttributeDto;
    const attributes = await this.modelAttributeRepo.findAll({
      where: { model_id: model_id, is_changable: true },
      include: { model: Attribute, attributes: ['name'] },
    });

    return attributes;
  }

  async getFixedAttributes(model_id: number) {
    const attributes = await this.modelAttributeRepo.findAll({
      where: { model_id: model_id, is_changable: false },
      include: { model: Attribute, attributes: ['name'] },
    });

    return attributes;
  }

  async findOne(id: number) {
    const model_attribute = await this.modelAttributeRepo.findByPk(id, {
      include: { model: Attribute, attributes: ['name'] },
    });

    if (!model_attribute) {
      throw new NotFoundException(`ModelAttribute with id ${id} not found`);
    }

    return model_attribute;
  }

  async update(id: number, updateModelAttributeDto: UpdateModelAttributeDto) {
    const { model_id, attribute_id, attribute_value, is_changable } =
      updateModelAttributeDto;
    const model_attribute = await this.modelAttributeRepo.findOne({
      where: { id: id },
    });

    if (!model_attribute) {
      throw new NotFoundException('Model attribute is not found');
    }

    const updatedModelAttr = await this.modelAttributeRepo.update(
      {
        model_id,
        attribute_id,
        is_changable,
        attribute_value: Array.isArray(attribute_value)
          ? attribute_value
          : [attribute_value],
      },
      { where: { id: id } },
    );

    return updatedModelAttr;
  }

  async remove(id: number) {
    const numberOfDeletedRows = await this.modelAttributeRepo.destroy({
      where: { id },
    });

    if (numberOfDeletedRows === 0) {
      throw new NotFoundException(`ModelAttribute with id ${id} not found`);
    }

    return {
      message: `ModelAttribute with id ${id} has been deleted successfully`,
    };
  }
}
