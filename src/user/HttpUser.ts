import { Async } from "../utils/asynchronism"
import { checkStatus } from "../utils/error"
import { Model } from "../utils/model"
import { filterNotNone } from "../utils/list"
import { VoidT } from "../utils/serialization"

export const CONTENT_TYPES = {
  application: {
    json: "application/json"
  }
}

export type HttpClient = {

  get: <T>(url: string, resultType: Model<T>) => Async<T>
  post: <T>(url: string, body: FormData | unknown, resultType: Model<T>) => Async<T>

}

export const httpRequest = <T>(
  args: {
    method: "GET" | "POST",
    url: string,
    contentType?: string,
    authToken?: string,
    body?: FormData | string,
    resultType: Model<T>
  }
): Async<T> => 
    async () => {
      console.log(args.method)
      console.log(args.url)
      console.log(args.contentType)
      console.log(args.authToken)
      console.log(args.body)
      console.log(args.resultType)
      const headers1 = filterNotNone([
        args.contentType !== undefined ? ["Content-Type", args.contentType] : undefined,
        args.authToken !== undefined ? ["Authorization", `Bearer ${args.authToken}`] : undefined, 
      ]) as string[][]
      console.log(headers1)
      const response = await fetch("https://ubademy-users-api.herokuapp.com" + args.url, { 
        method: args.method, 
        mode: "cors",
        headers: headers1,
        body: args.body
      })
      // si pongo esto en none me tira sorry password o user incorret
      checkStatus(response.status)
      console.log(response.status)
      return args.resultType as never as Model<void> === VoidT ? 
        undefined as never as T : 
        args.resultType.codec.decode(await response.json())
    }

export const httpUser = (authToken?: string): HttpClient => ({

  get: (url, resultType) => 
    httpRequest({
      method: "GET",
      url: url,
      authToken: authToken,
      resultType: resultType
    }),

  post: (url, body, resultType) =>
    httpRequest({
      method: "POST",
      url: url,
      authToken: authToken,
      contentType: body instanceof FormData ? undefined : CONTENT_TYPES.application.json,
      body: body instanceof FormData ? body : JSON.stringify(body),
      resultType: resultType,
    })
})
