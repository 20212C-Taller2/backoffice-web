import { Codec, codecCompose } from "./codec"
import { throwError } from "./error"
import { id } from "./functional"
import { Json, ListOf, Model, Obtain, ProductOf } from "./model"



export const VoidT: Model<void> = {
  codec: {
    encode: () => undefined,
    decode: () => undefined
  },
  check: (value): value is void => true
}
  
export const stringCodec: Codec<string, Json> = {
  encode: id,
  decode: value => StringT.check(value) ? value : throwError({name: `${value}`, message: `${value} is not a string`} )
}

export const booleanCodec: Codec<boolean, Json> = {
  encode: id,
  decode: value => BooleanT.check(value) ? value : throwError({name: `${value}`, message:`${value} is not a boolean`})
}

export const BooleanT: Model<boolean> = {
  codec: booleanCodec,
  check: (value): value is boolean => typeof value === "boolean"
}

export const StringT: Model<string> = {
  codec: stringCodec,
  check: (value): value is string => typeof value === "string"
}


export const jsonToStringCodec: Codec<Json, string> = {
  encode: value => JSON.stringify(value),
  decode: encoded => JSON.parse(encoded)
}

export const stringCodecOf = <T>(model: Model<T>): Codec<T, string> => 
  codecCompose(model.codec, jsonToStringCodec)

export const OptionalOf = <T>(
  model: Model<T>
): Model<T | undefined> => ({
    codec: optionalCodec(model.codec),
    check: (value): value is T | undefined => value === undefined || model.check(value) })

export const optionalCodec = <T>(
  codec: Codec<T, Json>
): Codec<T | undefined, Json> => ({
    encode: value => value === undefined || value === null ? null : codec.encode(value),
    decode: encoded => encoded === null || encoded === undefined ? undefined : codec.decode(encoded)
  })

const AdminDataT = ProductOf({
  id: StringT,
  firstName: StringT,
  lastName: StringT,
  email: StringT
})

export const UserDataT = ProductOf({
  id: StringT,
  firstName: StringT,
  lastName: StringT,
  email: StringT,
  placeId: StringT,
  interests: ListOf(StringT),
  blocked: BooleanT
})

export const UserListT = ProductOf({
  users: ListOf(UserDataT)
})

export const CredentialsT = ProductOf({
  auth: BooleanT,
  token: StringT,
  user: AdminDataT
})

export type UserData = Obtain<typeof UserDataT>

export type UserDataList = Obtain<typeof UserListT>

export type Credentials = Obtain<typeof CredentialsT>

