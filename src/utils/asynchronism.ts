/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react"
import { IO } from "./functional"
import { List } from "./list"
import { AsyncState, useAsync } from "react-async"

export type Async<T> = () => Promise<T>

export type Asynchronism<P, O, E = Error> = IdleAsynchronism<P> | RunningAsynchronism<P> | CompletedAsynchronism<P, O> | FailedAsynchronism<P, E>

type BaseAsynchronism<P> = {
    reload: IO<void>
    cancel: IO<void>
    run: (args: P) => IO<void>
}

export type IdleAsynchronism<P> = BaseAsynchronism<P> & {
    status: "idle"
    result: undefined
    error: undefined
  }
  
export type RunningAsynchronism<P> = BaseAsynchronism<P> & {
    status: "running"
    result: undefined
    error: undefined
  }
  
export type CompletedAsynchronism<P, O> = BaseAsynchronism<P> & {
    status: "completed"
    result: O
    error: undefined
  }
  
export type FailedAsynchronism<P, E> = BaseAsynchronism<P> & {
    status: "failed"
    result: undefined,
    error: E
  }

export const useAsynchronous = <P, O, E = Error>(
  asyncFunction: (args: P) => Async<O>, 
  dependencies?: List<unknown>
): Asynchronism<P, O, E>  => {
  
  const f = useMemo(() => (args: List<unknown>) => asyncFunction(args[0] as never)(), dependencies ?? [asyncFunction])
  const asyncState = useAsync({ deferFn: f })
  
  return toAsynchronism(asyncState)
}

const toAsynchronism = <P, O, E = Error>(
  asyncState: AsyncState<O>
): Asynchronism<P, O, E> => {
  
  const common = {
    run: (args: P): IO<void> => () => asyncState.run(args),
    reload: asyncState.reload,
    cancel: asyncState.cancel
  }
  
  switch (asyncState.status) {
  case "initial":
    return {
      status: "idle",
      result: undefined,
      error: undefined,
      ...common
    }
  case "pending":
    return {
      status: "running",
      result: undefined,
      error: undefined,
      ...common
    }
  case "fulfilled":
    return {
      status: "completed",
      result: asyncState.data,
      error: undefined,
      ...common
    }
  case "rejected":
    return {
      status: "failed",
      result: undefined,
      error: asyncState.error as never,
      ...common
    }
  }
}