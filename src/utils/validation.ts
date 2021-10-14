// eslint-disable-next-line no-useless-escape
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
// 8 caracteres, 1 mayúscula y 1 número
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const isEmail = (text: string): boolean => emailRegex.test(text)
export const isValidPassword = (text: string): boolean => passwordRegex.test(text)
export const isBlank = (text: string): boolean => text.trim() === ""
export const isValidName = (text: string): boolean => text.length < 15 && text.length > 1