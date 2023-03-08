import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { RefrigeratorsService } from './refrigerators.service';
import { CreateRefrigeratorDto } from './dto/create-refrigerator.dto';
import { UpdateRefrigeratorDto } from './dto/update-refrigerator.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetRefrigeratorsDto } from './dto/get-refrigerators.dto';
import { RefrigeratorTagType } from './types/refrigerators.type';

@UseGuards(JwtAuthGuard)
@Controller('refrigerators')
export class RefrigeraotrsController {
  constructor(private readonly refrigeratorsService: RefrigeratorsService) {}

  @Get()
  findAllByUser(
    @Req() req,
    @Query() getRefrigeratorsDto: GetRefrigeratorsDto,
  ) {
    return this.refrigeratorsService.findAllByUser(
      req.user.id,
      getRefrigeratorsDto
    );
  }

  @Post()
  create(
    @Req() req,
    @Body() createRefrigeratorDto: CreateRefrigeratorDto
  ) {
    return this.refrigeratorsService.create(req.user.id, createRefrigeratorDto);
  }

  @Patch()
  updateMany(
    @Body() updateRefrigeratorDtos: UpdateRefrigeratorDto[]
  ) {
    return this.refrigeratorsService.updateMany(updateRefrigeratorDtos);
  }

  @Post('delete')
  deleteMany(
    @Body('ids') ids: number[]
  ) {
    return this.refrigeratorsService.deleteMany(ids);
  }
  
  @Patch(':id/tag/:type')
  toggleTag(
    @Param('id') id: number,
    @Param('type') type: RefrigeratorTagType
  ) {
    return this.refrigeratorsService.toggleTag(id, type);
  }
}
