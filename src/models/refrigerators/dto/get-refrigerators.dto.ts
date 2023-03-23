import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetRefrigeratorsDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    categoryId: number

    @IsOptional()
    @IsString()
    keyword: string
}