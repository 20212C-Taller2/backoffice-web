import { Async } from "../utils/asynchronism"
import { IO } from "../utils/functional"
import { List } from "../utils/list"
import { Credentials, UserData, UserDataList, UserDataT, UserListT, VoidT } from "../utils/serialization"
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

  getUsers: (args: { credentials: Credentials}) => Async<List<UserData>>

  getUser: (args: { credentials: Credentials, userId: string}) => Async<UserData>

  blockUnblockUser: (args: { credentials: Credentials, userId: string, block: boolean}) => Async<void>

}


export const buildAdminUser = (
  credentials: State<Credentials>,
  logout: IO<void>,
): AdminUser => {
  
  return {
    type: "admin",
  
    actions: {
      
      logout: logout,

      registerAdmin: registerAdminAsync,

      getUsers: getUsers,

      getUser: getUser,

      blockUnblockUser: blockUnblockUser
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

export const getUsers = (
  args:{
    credentials: Credentials
  }
): Async<List<UserData>> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)

  const userList = await httpAdminUser.get(
    "/users", 
    UserListT
  )()

  return userList.users
}

export const getUser = (
  args:{
    credentials: Credentials,
    userId: string
  }
): Async<UserData> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)

  const user = await httpAdminUser.get(
    `/users/${args.userId}`, 
    UserDataT
  )()

  return user
}

export const blockUnblockUser = (
  args: { 
    credentials: Credentials, 
    userId: string, 
    block: boolean
  }
): Async<void> => async() => {

  const token = args.credentials.token
  const httpAdminUser = httpUser(token)
  console.log("ss")
  const adminOperation = args.block ? 
    httpAdminUser.post(
      `/users/${args.userId}/block`, 
      undefined,
      VoidT
    ) :
    httpAdminUser.delete(
      `/users/${args.userId}/block`, 
      VoidT
    )
  console.log(args.block)
  await adminOperation()
}