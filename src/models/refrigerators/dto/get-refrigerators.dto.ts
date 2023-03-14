import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetRefrigeratorsDto extends PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    categoryId: number

    @IsOptional()
    @IsString()
    keyword: string
}