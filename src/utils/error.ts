

export const throwError = (error: Error): never => { throw error }

export const checkStatus = (status: number): void => {
  if (status >= 400) throwError({ name: "BackendError", message: `Status code ${status}` })
}

export const ifCatch = <T>(compute: () => T, value: T): T => {
  try {
    return compute()
  } catch(e) {
    return value
  }
}