import { PartialType } from '@nestjs/swagger';
import { CreateModelAttributeDto } from './create-model_attribute.dto';

export class UpdateModelAttributeDto extends PartialType(CreateModelAttributeDto) {}
