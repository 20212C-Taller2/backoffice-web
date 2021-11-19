import { throwError } from "./error"
import { List } from "./list"
import { Json } from "./model"

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

export const listCodec = <T>(
  codec: Codec<T, Json>
): Codec<List<T>, Json> => ({
    encode: value => value.map(codec.encode),
    decode: encoded => {
      if (!Array.isArray(encoded)) return throwError({name: "Codec error", message: "not an array"})
      return encoded.map(codec.decode)
    }
  })