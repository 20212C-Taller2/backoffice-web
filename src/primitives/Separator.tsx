import React from "react"
import { Divider } from "@material-ui/core"
import { Property } from "csstype"

export const Separator = (
  props: {
    alignSelf?: string
    borderTop?: string
    width?: string
    height?: string
    color?: Property.Color
    style?: React.CSSProperties
    orientation?: "horizontal" | "vertical"
    className?: string
  }
) => <Divider
  orientation= {props.orientation === "horizontal" ? "horizontal" : 
    props.orientation === "vertical" ? "vertical" : "horizontal"}
  style={{
    alignSelf: props.alignSelf,
    borderTop: props.borderTop,
    width: props.width,
    height: props.height,
    color: props.color,
    ...props.style
  }}
  className={props.className}
/>
