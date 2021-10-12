import { Async } from "../utils/asynchronism"
import { IO } from "../utils/functional"
import { Credentials } from "./user"

export type VisitorUser = {
    type: "visitor"
  
    actions: VisitorActions
}

export type VisitorActions = {
    login: (args: { username: string, password: string }) => Async<void>
    
    signUp: () => Async<void>
}

export const buildVisitorUser = (
  setCredentials: (credential: Credentials) => IO<void>,
): VisitorUser =>  {
    
  
  return {
    type: "visitor",
  
    actions: {
      login: (args: {username: string, password: string} ) => async () => {
        /* async login */
      },
  
      signUp: () => async() => {}
    }
  
  }
}
  