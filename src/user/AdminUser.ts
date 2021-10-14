import { Async } from "../utils/asynchronism"
import { IO } from "../utils/functional"
import { Credentials, VoidT } from "../utils/serialization"
import { State } from "../utils/state"
import { httpUser } from "./HttpUser"

export type AdminUser = {
  type: "admin"
  
  actions: AdminActions

  credentials: Credentials
}


export type AdminActions = {

  logout: IO<void>

  registerAdmin: (args: { firstName: string, lastName: string, email: string, password: string }) => Async<void>

}


export const buildAdminUser = (
  credentials: State<Credentials>,
  logout: IO<void>,
): AdminUser => {
  
  return {
    type: "admin",
  
    actions: {
      
      logout: logout,

      registerAdmin: registerAdminAsync

    },

    credentials: credentials.value
  }
}

export const registerAdminAsync = (
  args: { 
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string 
  }
): Async<void> => async() => {

  const httpAdminUser = httpUser()

  const registerAdminBody = {
    firstName: args.firstName,
    lastName: args.lastName,
    email: args.email,
    password: args.password
  }

  await httpAdminUser.post(
    "/register/admin", 
    registerAdminBody,
    VoidT
  )()
}