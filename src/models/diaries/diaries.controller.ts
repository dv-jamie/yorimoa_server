import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DiariesService } from './diaries.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

@Controller('diaries')
export class DiariesController {
  constructor(private readonly diariesService: DiariesService) {}

  @Get()
  findAll() {
    return this.diariesService.findAll();
  }

  @Get('user/:id')
  findAllByUser(@Param('id') id: number) {
    return this.diariesService.findAllByUser(id);
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
  removeOne(@Param('id') id: number) {
    return this.diariesService.removeOne(id);
  }
}
