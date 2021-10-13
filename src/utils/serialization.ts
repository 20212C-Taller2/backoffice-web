import { throwError } from "./error"
import { id } from "./functional"
import { Json, Model, Obtain, ProductOf } from "./model"

export type Codec<T, E> = {
  encode: (value: T) => E
  decode: (encoded: E) => T
}

export const codecCompose = <A, B, C>(
  lhs: Codec<A, B>,
  rhs: Codec<B, C>
): Codec<A, C> => ({
    encode: value => rhs.encode(lhs.encode(value)),
    decode: encoded => lhs.decode(rhs.decode(encoded))
  })

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

const UserT = ProductOf({
  id: StringT,
  firstName: StringT,
  lastName: StringT,
  email: StringT
})

export const CredentialsT = ProductOf({
  auth: BooleanT,
  token: StringT,
  user: UserT
})

export type Credentials = Obtain<typeof CredentialsT>

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