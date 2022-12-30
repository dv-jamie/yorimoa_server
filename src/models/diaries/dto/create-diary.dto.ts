import { PickType } from "@nestjs/mapped-types";
import { Diary } from "../entities/diary.entity";

export class CreateDiaryDto extends PickType(Diary, [
    'content',
    'images',
    'themes',
] as const) {}
