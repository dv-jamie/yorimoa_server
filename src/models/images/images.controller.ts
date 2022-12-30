import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.imagesService.findOne(id);
  }
}
