import { IsNumber, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { booleanMapper } from 'src/common/dto/boolean-mapper';

export class GetDiariesDto extends PaginationDto {
    @Transform(({ value }) => JSON.parse(value))
    @IsNumber({}, { each: true })
    themeIds: number[]

    @Transform(({ value }) => booleanMapper.get(value))
    @IsBoolean()
    onlyRecipesLinked: boolean
}
