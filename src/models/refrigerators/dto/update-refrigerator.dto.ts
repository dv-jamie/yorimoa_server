import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreateRefrigeratorDto } from './create-refrigerator.dto';

export class UpdateRefrigeratorDto extends PartialType(CreateRefrigeratorDto) {
    @IsNumber()
    id: number
}
