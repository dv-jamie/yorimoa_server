import { PickType } from "@nestjs/mapped-types";
import { IsNumber } from "class-validator";
import { Refrigerator } from "../entities/refrigerator.entity";

export class CreateRefrigeratorDto extends PickType(Refrigerator, [
    'name',
    'boughtAt',
] as const) {
    @IsNumber({}, { each: true })
    categoryIds: number[]
}
