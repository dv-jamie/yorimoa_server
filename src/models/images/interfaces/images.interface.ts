import { Diary } from "src/models/diaries/entities/diary.entity"
import { Recipe } from "src/models/recipes/entities/recipe.entity"
import { Step } from "src/models/steps/entities/step.entity"

export interface CreateImageByUrlsDto {
    urls: string[]
    recipe?: Recipe
    step?: Step
    diary?: Diary
}