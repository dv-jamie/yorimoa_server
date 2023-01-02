import { IsNumber, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetRecipesDto extends PaginationDto {
    @Type(() => Number)
    @IsNumber()
    minServing: number

    @Type(() => Number)
    @IsNumber()
    maxServing: number

    @Type(() => Number)
    @IsNumber()
    minTime: number

    @Type(() => Number)
    @IsNumber({ allowNaN: true })
    maxTime: number | null

    @Type(() => Number)
    @IsNumber()
    minLevel: number

    @Type(() => Number)
    @IsNumber()
    maxLevel: number

    @Transform(({ value }) => JSON.parse(value))
    @IsNumber({}, { each: true })
    themeIds: number[]

    @Transform(({ value }) => JSON.parse(value))
    @IsNumber({}, { each: true })
    categoryIds: number[]
}
