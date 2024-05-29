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
  UseGuards,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdsDto } from './dto/create-ads.dto';
import { UpdateAdsDto } from './dto/update-ads.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';


@ApiTags("Ads")
@ApiBearerAuth()
@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Create a new advertisement with media' })
  @Post('create')
  create(@Body() createAdsDto: CreateAdsDto) {
    return this.adsService.create(createAdsDto);
  }

  @ApiOperation({ summary: 'Upload file' })
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Update an advertisement by ID' })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateAdsDto: UpdateAdsDto) {
    return this.adsService.update(+id, updateAdsDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ROLE(Roles.ADMIN)
  @ApiOperation({ summary: 'Delete an advertisement by ID' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.adsService.remove(+id);
  }
}
