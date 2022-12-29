import { PickType } from "@nestjs/mapped-types";
import { Recipe } from "../entities/recipe.entity";

export class CreateRecipeDto extends PickType(Recipe, [
    'title',
    'time',
    'serving',
    'level',
    'summary',
    'images',
    'ingredients',
    'steps',
    'categories',
    'themes',
] as const) {}
