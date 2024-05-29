import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StorageGetter } from 'src/decorators/storageGetter-cookie.decorator.ts';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ROLE } from 'src/decorators/roles';
import { Roles } from 'src/common/types/roles';

@ApiTags('Comment')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Add comment' })
  @Post('add')
  create(@Body() createCommentDto: CreateCommentDto, @StorageGetter() accessToken: string) {
    return this.commentService.create(createCommentDto, accessToken);
  }
  @ApiOperation({ summary: 'Get all comments' })
  @Get('get-all')
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'Get comment by id' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update comment by id' })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete comment by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
