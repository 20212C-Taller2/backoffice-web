import React, { useMemo } from "react"
import { AdminUser } from "./user/AdminUser"
import { buildUser, Credentials } from "./user/user"
import { VisitorUser } from "./user/VisitorUser"
import { UbademyRouter } from "./UbademyRouter"
import { State } from "./utils/state"
import { UserContext } from "./hooks/context"

const useUser = (credentials: State<Credentials | undefined>): AdminUser | VisitorUser => {

  const user = useMemo(() => buildUser(credentials), [credentials])

  return user
}


export const UbademyBackoffice = () => {

  const user = useUser(credentials)

  return (
    <UserContext.Provider value={user}>
      <UbademyRouter 
        user={user}
      />
    </UserContext.Provider>
  )
}
