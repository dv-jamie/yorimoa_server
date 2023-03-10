import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DiariesService } from './diaries.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { GetDiariesDto } from './dto/get-diaries.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

@Controller('diaries')
export class DiariesController {
  constructor(private readonly diariesService: DiariesService) {}

  @Get()
  findAll(
    @Query() getDiariesDto: GetDiariesDto,
  ) {
    return this.diariesService.findAll(getDiariesDto);
  }

  @Get('user/:id')
  findAllByUser(
    @Param('id') id: number,
    @Query() paginationDto: PaginationDto
  ) {
    return this.diariesService.findAllByUser(id, paginationDto);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.diariesService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Body() createDiaryDto: CreateDiaryDto
  ) {
    return this.diariesService.create(req.user.id, createDiaryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne(
    @Param('id') id: number,
    @Body() updateDiaryDto: UpdateDiaryDto
  ) {
    return this.diariesService.updateOne(id, updateDiaryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.diariesService.deleteOne(id);
  }
}
