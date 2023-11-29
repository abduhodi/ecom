import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ModelAttributeService } from './model_attribute.service';
import { CreateModelAttributeDto } from './dto/create-model_attribute.dto';
import { UpdateModelAttributeDto } from './dto/update-model_attribute.dto';
import { GetAttributeDto } from './dto/get-attribute.dto';

@Controller('model-attribute')
export class ModelAttributeController {
  constructor(private readonly modelAttributeService: ModelAttributeService) {}

  @Post('create')
  create(@Body() createModelAttributeDto: CreateModelAttributeDto) {
    return this.modelAttributeService.create(createModelAttributeDto);
  }

  @Get('get-all')
  findAll() {
    return this.modelAttributeService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post('get-model-attributes')
  getModelAttributes(@Body() getAttributeDto: GetAttributeDto) {
    return this.modelAttributeService.getModelAttributes(getAttributeDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('get-fixed-attributes')
  getFiexedAttributes(@Body() getAttributeDto: GetAttributeDto) {
    return this.modelAttributeService.getFixedAttributes(
      getAttributeDto?.model_id,
    );
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.modelAttributeService.findOne(+id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateModelAttributeDto: UpdateModelAttributeDto,
  ) {
    return this.modelAttributeService.update(+id, updateModelAttributeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.modelAttributeService.remove(+id);
  }
}
