import { QueryClient } from "react-query"
import { sequenceIO } from "../utils/functional"
import { Credentials } from "../utils/serialization"
import { definedState, setTo, State } from "../utils/state"
import { AdminUser, buildAdminUser } from "./AdminUser"
import { buildVisitorUser, VisitorUser } from "./VisitorUser"

export type UdemyUser = AdminUser | VisitorUser

export const buildUser = (
  credentials: State<Credentials | undefined>,
  queryClient: QueryClient
): AdminUser | VisitorUser => {
  
  const adminCredentials = definedState(credentials)

  const logout = sequenceIO([
    () => queryClient.removeQueries(),
    setTo(credentials, undefined)
  ])

  return (
    adminCredentials !== undefined ? buildAdminUser(adminCredentials, logout) :
      buildVisitorUser(newCredentials => setTo(credentials, newCredentials))
  )
}
  