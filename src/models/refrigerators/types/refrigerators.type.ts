export const RefrigeratorTagType = {
    EAT: 'eat',
    BUY: 'buy',
}
export type RefrigeratorTagType = typeof RefrigeratorTagType[keyof typeof RefrigeratorTagType];