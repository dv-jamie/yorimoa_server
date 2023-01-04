import { PickType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from 'class-validator';
import { Diary } from "../entities/diary.entity";

export class CreateDiaryDto extends PickType(Diary, [
    'content',
] as const) {
    @IsNumber({}, { each: true })
    themeIds: number[]

    @IsString({ each: true })
    imageUrls: string[]

    @IsNumber({}, { each: true })
    recipeIds: number[]
}
