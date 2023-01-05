import { PickType } from "@nestjs/mapped-types";
import { IsNumber } from "class-validator";
import { Recipe } from "../entities/recipe.entity";

export class CreateRecipeDto extends PickType(Recipe, [
    'title',
    'time',
    'serving',
    'level',
    'summary',
    'images',
    'steps',
    'ingredients'
] as const) {
    @IsNumber({}, { each: true })
    categoryIds: number[]

    @IsNumber({}, { each: true })
    themeIds: number[]

    @IsNumber({}, { each: true })
    diaryIds: number[]
}
