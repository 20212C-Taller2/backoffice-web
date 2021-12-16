/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react"
import { AdminUser } from "./user/AdminUser"
import { buildUser } from "./user/user"
import { VisitorUser } from "./user/VisitorUser"
import { UbademyRouter } from "./UbademyRouter"
import { State, usePersistentState } from "./utils/state"
import { UserContext } from "./hooks/context"
import { Credentials, CredentialsT } from "./utils/serialization"
import { useQueryClient } from "react-query"
import { stringCodecOf } from "./utils/codec"
import { OptionalOf } from "./utils/model"

const useUser = (credentials: State<Credentials | undefined>): AdminUser | VisitorUser => {

  const queryClient = useQueryClient()

  const user = useMemo(
    () => buildUser(credentials, queryClient), 
    [credentials]
  )

  return user
}


export const UbademyBackofficeApp = () => {

  const credentials = usePersistentState<Credentials | undefined>(
    "credentials", 
    stringCodecOf(OptionalOf(CredentialsT)), 
    undefined
  )

  const user = useUser(credentials)

  return (
    <UserContext.Provider value={user}>
      <UbademyRouter 
        user={user}
      />
    </UserContext.Provider>
  )
}
