import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Add comment' })
  @Post('add')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
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

  @ApiOperation({ summary: 'Update comment by id' })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete comment by id' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
