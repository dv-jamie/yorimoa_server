export interface IngredientExceptGroup {
    name: string
    amount: string
}

export interface IngredientGroup {
    group: number
    division: string
    indigredients: IngredientExceptGroup[]
}