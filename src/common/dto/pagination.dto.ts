import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    page: number
    
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    size: number
}
