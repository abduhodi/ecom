import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StorageGetter } from 'src/decorators/storageGetter-cookie.decorator.ts';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({ summary: 'Add rating' })
  @Post('add')
  create(@Body() createRatingDto: CreateRatingDto, @StorageGetter() accessToken:string) {
    return this.ratingService.create(createRatingDto, accessToken);
  }
  @ApiOperation({ summary: 'Get all ratings' })
  @Get('get-all')
  findAll() {
    return this.ratingService.findAll();
  }

  @ApiOperation({ summary: 'Get rating by id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update rating by id' })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @ApiOperation({ summary: 'Delete rating by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }
}
