import React from "react"
import { AdminUser } from "../user/AdminUser"
import { UdemyUser } from "../user/user"
import { VisitorUser } from "../user/VisitorUser"
import { throwError } from "../utils/error"

export const UserContext = React.createContext<AdminUser | VisitorUser | undefined>(undefined)


export const useUbademyUser = () => {
  return React.useContext(UserContext)
}

const useUserType = <T extends UdemyUser>(check: (user: UdemyUser | undefined) => user is T): T => {
  const user = useUbademyUser()
  return check(user) ? user : throwError({name: "Forbidden", message: "Forbidden User type"})
}

  
export const useVisitorUser = () => 
  useUserType(
    (user): user is VisitorUser => user?.type === "visitor"
  )

export const useAdminUser = () => 
  useUserType(
    (user): user is AdminUser => user?.type === "admin"
  )