import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetRefrigeratorsDto extends PaginationDto {
    @IsOptional()
    @IsNumber()
    categoryId: number

    @IsOptional()
    @IsString()
    keyword: string
}