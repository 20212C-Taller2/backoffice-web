import { Async } from "../utils/asynchronism"
import { IO } from "../utils/functional"
import { Credentials, StringT } from "../utils/serialization"
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
        //const credentials  = await login(runtime, args.username, args.password)()
        const bodyLogin = {
          mode: "raw",
          raw: {
            email: "admin@gmail.com",
            password: "123456"
          }
        }

        const token  =  await httpVisitorUser.post(
          "https://ubademy-users-api.herokuapp.com/login/admin", 
          JSON.stringify(bodyLogin),
          StringT
        )()

        const credentials: Credentials = {
          token: token
        }

        setCredentials(credentials)()
      },
  
      //signUp: () => async() => {}
    }
  
  }
}
  