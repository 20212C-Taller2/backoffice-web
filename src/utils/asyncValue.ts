import { FetchQueryOptions, InitialDataFunction, QueryClient, QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "react-query"
import { Async, asyncError, asyncNoOp, pureAsync } from "./asynchronism"


export type AsyncValue<T> = {
  queryFn?: QueryFunction<T>
  queryKey?: QueryKey
  initialData?: T | InitialDataFunction<T>
  staleTime?: number;
  read: Async<T>
  invalidate: Async<void>
}

export const asyncValue = (
  client: QueryClient
) => <T>(
  options: FetchQueryOptions<T, Error>
): AsyncValue<T> => ({
    ...options,
    read: async () => client.fetchQuery(options),
    invalidate: async () => client.invalidateQueries(options.queryKey)
  })

export const errorAsyncValue: AsyncValue<never> = {
  queryFn: asyncError,
  read: asyncError,
  invalidate: asyncNoOp,
  staleTime: 0
}

export const useAsyncValue = <T>(
  state: AsyncValue<T>,
  options?: UseQueryOptions<T, Error>
): UseQueryResult<T, Error> => {
  return useQuery<T, Error>({
    ...state,
    ...options
  })
}

export const constantAsyncValue = <T>(value: T): AsyncValue<T> => ({
  queryFn: pureAsync(value),
  read: pureAsync(value),
  invalidate: asyncNoOp,
  queryKey: [value],
})

