export const RecipeOrderType = {
    CREATED_AT: 'createdAt',
    BOOKMARKS_COUNT: 'bookmarksCount',
    REPLIES_COUNT: 'repliesCount'
}
export type RecipeOrderType = typeof RecipeOrderType[keyof typeof RecipeOrderType];