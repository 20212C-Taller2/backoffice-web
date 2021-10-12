import { setTo, State } from "../utils/state"
import { AdminUser, buildAdminUser } from "./AdminUser"
import { buildVisitorUser, VisitorUser } from "./VisitorUser"

export type UdemyUser = AdminUser | VisitorUser

export type Credentials = {
    tokens: {
        access: {
            value: string
        }
    }
    userType: "visitor" | "admin"
}

export const buildUser = (
  credentials: State<Credentials | undefined>,
): AdminUser | VisitorUser => {
  
  return (
    credentials !== undefined ? buildAdminUser(credentials) :
      buildVisitorUser(newCredentials => setTo(credentials, newCredentials))
  )
}
  