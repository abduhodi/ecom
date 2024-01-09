import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdsDto } from './dto/create-ads.dto';
import { UpdateAdsDto } from './dto/update-ads.dto';
import { ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @ApiOperation({ summary: 'Create a new advertisement with media' })
  @Post('create')
  create(@Body() createAdsDto: CreateAdsDto) {
    return this.adsService.create(createAdsDto);
  }

  @ApiOperation({ summary: 'Upload file' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    return this.adsService.uploadFile(file);
  }

  @ApiOperation({ summary: 'Get all advertisements' })
  @Get('get-all/q?')
  findAll(@Query() q: any) {
    return this.adsService.findAll(q?.limit, q?.page);
  }

  @ApiOperation({ summary: 'Get an advertisement by ID' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.adsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an advertisement by ID' })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateAdsDto: UpdateAdsDto) {
    return this.adsService.update(+id, updateAdsDto);
  }

  @ApiOperation({ summary: 'Delete an advertisement by ID' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.adsService.remove(+id);
  }
}
