import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetRecipesDto } from './dto/get-recipes.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(
    @Query() getRecipesDto: GetRecipesDto,
  ) {
    return this.recipesService.findAll(getRecipesDto);
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
  deleteOne(@Param('id') id: number) {
    return this.recipesService.deleteOne(id);
  }
}
