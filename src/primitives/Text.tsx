import React from "react"
import { Typography } from "@material-ui/core"
import { buildStyle, UiPrimitiveProps } from "../utils/types"

export const Text = (
  props: UiPrimitiveProps & {
    color?: string
    backgroundColor?: string
    text?: string
    fontSize?: number | string
    fontStyle?: "normal" | "italic" | "oblique"
    textAlign?: "center" | "left" | "right" | "justify"
    children?: React.ReactNode
    bold?: boolean
    align?: AlignText
    noWrap?: boolean
  }
) => <Typography
  style={{
    fontSize: props.fontSize,
    fontWeight: props.bold === true ? "bold" : "initial",
    fontStyle: props.fontStyle,
    textAlign: props.textAlign,
    color: typeof props.color === "string" ? props.color :  props.color,
    ...buildStyle(props)
  }}
  align={props.align}
  onClick={props.onClick}
  noWrap={props.noWrap??false}
>
  {props.text}
  {props.children}
</Typography>

export type AlignText = "inherit" | "left" | "center" | "right" | "justify" | undefined 