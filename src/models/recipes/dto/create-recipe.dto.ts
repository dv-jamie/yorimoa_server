import { PickType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { Recipe } from "../entities/recipe.entity";

export class CreateRecipeDto extends PickType(Recipe, [
    'title',
    'time',
    'serving',
    'level',
    'summary',
    'ingredients',
    'steps',
] as const) {
    @IsNumber({}, { each: true })
    categoryIds: number[]

    @IsNumber({}, { each: true })
    themeIds: number[]

    @IsString({ each: true })
    imageUrls: string[]
}
