import { nop } from "../utils/functional"
import { Credentials } from "../utils/serialization"
import { definedState, setTo, State } from "../utils/state"
import { AdminUser, buildAdminUser } from "./AdminUser"
import { buildVisitorUser, VisitorUser } from "./VisitorUser"

export type UdemyUser = AdminUser | VisitorUser

export const buildUser = (
  credentials: State<Credentials | undefined>,
): AdminUser | VisitorUser => {
  
  const adminCredentials = definedState(credentials)

  return (
    adminCredentials !== undefined ? buildAdminUser(adminCredentials, nop) :
      buildVisitorUser(newCredentials => setTo(credentials, newCredentials))
  )
}
  