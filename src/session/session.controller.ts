import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
// import { JwtGuard } from '../guards/jwt.guard';
// import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Session')
@ApiBearerAuth()
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiOperation({ summary: 'Create a new session' })
  @Post()
  create(@Res({ passthrough: true }) res: Response) {
    return this.sessionService.create(res);
  }

  // @UseGuards(JwtGuard, AdminGuard)
  @ApiOperation({ summary: 'Get all sessions' })
  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  // @UseGuards(JwtGuard, AdminGuard)
  @ApiOperation({ summary: 'Get a session by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionService.findOne(+id);
  }

  // @UseGuards(JwtGuard, AdminGuard)
  @ApiOperation({ summary: 'Update a session by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionService.update(+id, updateSessionDto);
  }

  // @UseGuards(JwtGuard, AdminGuard)
  @ApiOperation({ summary: 'Delete a session by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionService.remove(+id);
  }
}
