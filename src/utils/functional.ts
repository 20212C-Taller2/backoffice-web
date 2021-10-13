/* eslint-disable @typescript-eslint/no-empty-function */
export type IO<T> = () => T

export const nop = () => {}

export const id = <T>(x: T) => x