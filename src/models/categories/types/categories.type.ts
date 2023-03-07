export const CategoriesType = {
    RECIPE: 'recipe',
    REFRIGERATOR: 'refrigerator'
}
export type CategoriesType = typeof CategoriesType[keyof typeof CategoriesType];