import { Codec, codecCompose, withDefaultCodec } from "./codec"
import { throwError } from "./error"
import { id } from "./functional"
import { Json, ListOf, Model, Obtain, OptionalOf, ProductOf, StringEnumOf, withDefault } from "./model"



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

export const numberCodec: Codec<number, Json> = {
  encode: id,
  decode: value => NumberT.check(value) ? value : throwError({name: `${value}`, message: `${value} is not a number`} )
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

export const NumberT: Model<number> = {
  codec: numberCodec,
  check: (value): value is number => typeof value === "number"
}


export const jsonToStringCodec: Codec<Json, string> = {
  encode: value => JSON.stringify(value),
  decode: encoded => JSON.parse(encoded)
}

const AdminDataT = ProductOf({
  id: StringT,
  firstName: StringT,
  lastName: StringT,
  email: StringT
})

export const UserT = ProductOf({
  id: StringT,
  firstName: StringT,
  lastName: StringT,
  email: StringT,
  placeId: StringT,
  interests: ListOf(StringT),
  blocked: BooleanT
})

export const UserListT = ProductOf({
  users: ListOf(UserT)
})

export const ExamT = ProductOf({
  title: StringT,
  published: BooleanT,
  questions: ListOf(
    ProductOf({
      number: NumberT,
      text: StringT,
      id: NumberT
    })
  ),
  id: NumberT
})

export const ExamListT = ListOf(ExamT)

export const CourseT = ProductOf({
  title: StringT,
  description: StringT,
  type: StringT,
  creator: StringT,
  location: OptionalOf(StringT),
  tags: ListOf(StringT),
  media: ListOf(StringT),
  subscription: StringT,
  id: NumberT,
  students: ListOf(StringT),
  collaborators: ListOf(StringT),
  exams: ExamListT
})

export const CourseListT = ListOf(CourseT)

export const MetricTypeT = StringEnumOf([
  "user-login", 
  "user-federated-login", 
  "user-unblocked", 
  "user-blocked", 
  "user-register",
  "user-federated-register" 
])

export const MetricT = ProductOf({
  operation: MetricTypeT,
  count: NumberT
})

export const MetricListT =  ProductOf({
  metrics: ListOf(MetricT)
})

export const CredentialsT = ProductOf({
  auth: BooleanT,
  token: StringT,
  user: AdminDataT
})

export type User = Obtain<typeof UserT>

export type UserList = Obtain<typeof UserListT>

export type Exam = Obtain<typeof ExamT>

export type ExamList = Obtain<typeof ExamListT>

export type Course = Obtain<typeof CourseT>

export type CourseList = Obtain<typeof CourseListT>

export type Metric = Obtain<typeof MetricT>

export type MetricType = Obtain<typeof MetricTypeT>

export type MetricList = Obtain<typeof MetricListT>

export type Credentials = Obtain<typeof CredentialsT>

