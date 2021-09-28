import React, { ComponentProps } from "react"
import {Property} from "csstype"
import { buildStyle, UiPrimitiveProps } from "../utils/types"

export const Picture = (
  props: UiPrimitiveProps & {
    source?: string
    alt?: string
    fit?: Property.ObjectFit
  } 
) => {

  return <img
    src={props.source}
    alt={props.alt}
    style={{
      objectPosition: "center",
      objectFit: props.fit,
      ...buildStyle(props),
    }}
    onClick={props.onClick}
  />
}
