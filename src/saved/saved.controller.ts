import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SavedService } from './saved.service';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StorageGetter } from 'src/decorators/storageGetter-cookie.decorator.ts';

@ApiTags('Saved')
@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @ApiOperation({ summary: 'Add saved' })
  @Post('add')
  create(@Body() createSavedDto: CreateSavedDto, @StorageGetter() accessToken:string) {
    return this.savedService.create(createSavedDto, accessToken);
  }
  @ApiOperation({ summary: 'Get all saveds' })
  @Get('get-all')
  findAll() {
    return this.savedService.findAll();
  }

  @ApiOperation({ summary: 'Get saved by id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.savedService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update saved by id' })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateSavedDto: UpdateSavedDto, @StorageGetter() accessToken:string) {
    return this.savedService.update(+id, updateSavedDto,accessToken);
  }

  @ApiOperation({ summary: 'Delete saved by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.savedService.remove(+id);
  }
}
