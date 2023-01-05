import { PickType } from "@nestjs/mapped-types";
import { IsNumber } from 'class-validator';
import { Diary } from "../entities/diary.entity";

export class CreateDiaryDto extends PickType(Diary, [
    'content',
    'images'
] as const) {
    @IsNumber({}, { each: true })
    themeIds: number[]

    @IsNumber({}, { each: true })
    recipeIds: number[]
}
