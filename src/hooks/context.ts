import React from "react"
import { AdminUser } from "../user/AdminUser"
import { VisitorUser } from "../user/VisitorUser"

export const UserContext = React.createContext<AdminUser | VisitorUser | undefined>(undefined)

export const useUser = () => {
  return React.useContext(UserContext)
}
  