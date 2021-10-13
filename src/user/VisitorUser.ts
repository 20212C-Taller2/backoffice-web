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
    
  const httpVisitorUser = httpUser()
  
  return {
    type: "visitor",
  
    actions: {
      login: (args: {username: string, password: string} ) => async () => {

        const bodyLogin = {email: "admin@gmail.com", password: "123456"}
        
        const fetchCredentials  =  await httpVisitorUser.post(
          "/login/admin", 
          JSON.stringify(bodyLogin),
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
  