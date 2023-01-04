export const ImageType = {
    RECIPE: 'recipe',
    STEP: 'step',
    DIARY: 'diary'
}
export type ImageType = typeof ImageType[keyof typeof ImageType]