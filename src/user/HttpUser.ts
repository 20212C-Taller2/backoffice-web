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

  get: <T>(url: string, resultType: Model<T>, gateway?: boolean) => Async<T>
  post: <T>(url: string, body: FormData | unknown, resultType: Model<T>) => Async<T>
  delete: <T>(url: string, resultType: Model<T>) => Async<T>
}

export const httpRequest = <T>(
  args: {
    method: "GET" | "POST" | "DELETE",
    url: string,
    contentType?: string,
    authToken?: string,
    body?: FormData | string,
    resultType: Model<T>
    gateway?: boolean
  }
): Async<T> => 
    async () => { 

      const response = await fetch(
        `${args.gateway === true ? 
          "https://ubademy-courses-api.herokuapp.com" : "https://ubademy-users-api.herokuapp.com"}${args.url}`, 
        { 
          method: args.method,
          mode: "cors", 
          headers: filterNotNone([
            args.contentType !== undefined ? ["Content-Type", args.contentType] : undefined,
            args.authToken !== undefined ? ["Authorization", `Bearer ${args.authToken}`] : undefined, 
          ]) as string[][],
          body: args.body
        }
      )
      checkStatus(response.status)

      return args.resultType as never as Model<void> === VoidT ? 
        undefined as never as T : 
        args.resultType.codec.decode(await response.json())
    }

export const httpUser = (authToken?: string): HttpClient => ({

  get: (url, resultType, gateway) => 
    httpRequest({
      method: "GET",
      url: url,
      authToken: authToken,
      resultType: resultType,
      gateway: gateway
    }),

  post: (url, body, resultType) =>
    httpRequest({
      method: "POST",
      url: url,
      authToken: authToken,
      contentType: body instanceof FormData ? undefined : CONTENT_TYPES.application.json,
      body: body instanceof FormData ? body : JSON.stringify(body),
      resultType: resultType,
    }),

  delete: (url, resultType) =>
    httpRequest({
      method: "DELETE",
      url: url,
      authToken: authToken,
      resultType: resultType,
    }),
})
