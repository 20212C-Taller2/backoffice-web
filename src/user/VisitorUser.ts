import { Async } from "../utils/asynchronism"
import { IO } from "../utils/functional"
import { Credentials, CredentialsT } from "../utils/serialization"
import { httpUser } from "./HttpUser"

export type VisitorUser = {
    type: "visitor"
  
    actions: VisitorActions
}

export type VisitorActions = {
    login: (args: { username: string, password: string }) => Async<void>
    
    //signUp: () => Async<void>
}

export const buildVisitorUser = (
  setCredentials: (credential: Credentials) => IO<void>,
): VisitorUser =>  {
    
  
  
  return {
    type: "visitor",
  
    actions: {
      login: (args: {username: string, password: string} ) => async () => {

        const httpVisitorUser = httpUser()
        
        const bodyLogin = {
          email: args.username, 
          password: args.password
        }
        
        const fetchCredentials  =  await httpVisitorUser.post(
          "/login/admin", 
          bodyLogin,
          CredentialsT
        )()

        const credentials: Credentials = {
          auth: fetchCredentials.auth,
          token: fetchCredentials.token,
          user: {
            id: fetchCredentials.user.id,
            firstName: fetchCredentials.user.firstName,
            lastName: fetchCredentials.user.lastName,
            email: fetchCredentials.user.email
          }
        }

        setCredentials(credentials)()
      },
  
      //signUp: () => async() => {}
    }
  
  }
}
  