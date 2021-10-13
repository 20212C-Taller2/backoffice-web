import { IO } from "../utils/functional"
import { Credentials } from "../utils/serialization"
import { State } from "../utils/state"

export type AdminUser = {
  type: "admin"
  
  actions: AdminActions
}


export type AdminActions = {

  logout: IO<void>

}


export const buildAdminUser = (
  credentials: State<Credentials>,
  logout: IO<void>,
): AdminUser => {
  
  return {
    type: "admin",
  
    actions: {
      logout: logout
    }
  }
}

