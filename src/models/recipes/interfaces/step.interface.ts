import { Image } from "src/models/images/entities/image.entity"

export interface StepExceptGroup {
    comment: string
    tip: string
    images: Image[]
}

export interface StepGroup {
    group: number
    division: string
    steps: StepExceptGroup[]
}