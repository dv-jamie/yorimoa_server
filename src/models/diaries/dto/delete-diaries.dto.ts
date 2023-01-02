import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class DeleteDiaryDto {
    @Transform(({ value }) => JSON.parse(value))
    @IsNumber({}, { each: true })
    recipeIds: number[]
}
