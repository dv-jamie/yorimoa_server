import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get('user/:id')
  findAllByUser(@Param('id') id: number) {
    return this.recipesService.findAllByUser(id);
  }

  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.recipesService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Body() createRecipeDto: CreateRecipeDto
  ) {
    return this.recipesService.create(req.user.id, createRecipeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne(
    @Param('id') id: number,
    @Body() updateRecipeDto: UpdateRecipeDto
  ) {
    return this.recipesService.updateOne(id, updateRecipeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeOne(@Param('id') id: number) {
    return this.recipesService.removeOne(id);
  }
}
