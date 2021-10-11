import { useMemo, useState } from "react"
import { IO } from "./functional"

export type State<S> = {
    value: S
    apply: (transition: (previous: S) => S) => IO<void>
}

export type Lens<A, B> = {
    read: (value: A) => B
    modified: (previous: A, value: B) => A
}

export const useStatefull = <S>(
  initializer: () => S
): State<S> => {
      
  const [value, setValue] = useState(initializer)
  
  // Performance memoization
  return useMemo( () => ({ 
    value: value, 
    apply:  (transition: (prev: S) => S): IO<void> => () => setValue(transition)
  }), [value, setValue])
}
  
  
export const setTo = <S>(
  state: State<S>, 
  value: S
): IO<void> => state.apply(() => value)

export const lens = <S, P extends keyof S>(
  field: P
): Lens<S, S[P]> => ({
    read: value => value[field],
    modified: (previous: S, value: S[P]) => ({ ...previous, [field]: value })
  })

export const applyLens = <S, P>(
  state: State<S>,
  lens: Lens<S, P>
): State<P> => ({
    value: lens.read(state.value),
    apply: transition => 
      state.apply(previous => 
        lens.modified(
          previous, 
          transition(lens.read(previous))
        ) 
      )
  })