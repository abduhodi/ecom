import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SessionItemsService } from './session_items.service';
import { CreateSessionItemDto } from './dto/create-session_item.dto';
import { UpdateSessionItemDto } from './dto/update-session_item.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

@Controller('session-items')
@ApiTags('Session Items')
export class SessionItemsController {
  constructor(private readonly sessionItemsService: SessionItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new session cart' })
  create(
    @Body() createSessionCartDto: CreateSessionItemDto,
    @CookieGetter('step_cookie') cookie: string,
  ) {
    return this.sessionItemsService.create(createSessionCartDto, cookie);
  }

  @Get()
  @ApiOperation({ summary: 'Get all session carts' })
  findAll() {
    return this.sessionItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a session cart by ID' })
  findOne(@Param('id') id: string) {
    return this.sessionItemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a session cart by ID' })
  update(
    @Param('id') id: string,
    @Body() updateSessionCartDto: UpdateSessionItemDto,
  ) {
    return this.sessionItemsService.update(+id, updateSessionCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session cart by ID' })
  remove(@Param('id') id: string) {
    return this.sessionItemsService.remove(+id);
  }
}
