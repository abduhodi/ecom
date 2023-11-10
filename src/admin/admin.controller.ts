import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAdminDto } from './dto/admin-login.dto';
import { Response } from 'express';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiCreatedResponse({
    description: 'Admin created successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOkResponse({ description: 'Admin logged in successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('login')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiNoContentResponse({ description: 'Admin logged out successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('logout')
  logout(
    @Body('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOkResponse({ description: 'Admin activated successfully' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @ApiOkResponse({ description: 'Return the list of admins' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOkResponse({ description: 'Return a specific admin by ID' })
  @ApiNotFoundResponse({ description: 'Admin not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Admin updated successfully' })
  @ApiNotFoundResponse({ description: 'Admin not found' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiNoContentResponse({ description: 'Admin removed successfully' })
  @ApiNotFoundResponse({ description: 'Admin not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
