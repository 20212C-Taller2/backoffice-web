export type List<T> = ReadonlyArray<T>

export const filterNotNone = <T>(list: List<T | undefined>): List<T> => list.filter(it => it !== undefined) as List<T>
