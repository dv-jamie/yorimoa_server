import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetRefrigeratorsDto extends PaginationDto {
    @Transform(({ value }) => JSON.parse(value))
    @IsNumber({}, { each: true })
    categoryIds: number[]

    @IsOptional()
    @IsString()
    keyword: string
}