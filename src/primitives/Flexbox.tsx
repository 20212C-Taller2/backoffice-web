import React from "react"
import { enumMatch } from "../utils/pattern-matching"
import { buildStyle, UiPrimitiveProps } from "../utils/types"

export type Justify = 
  | "start" 
  | "center" 
  | "end" 
  | "spaceAround" 
  | "spaceEvenly" 
  | "spaceBetween"

export type Align = 
  | "start" 
  | "center" 
  | "end" 
  | "stretch"


export type FlexboxProps = UiPrimitiveProps & {
    children?: React.ReactNode
    direction?: "column" | "row"
    wrap?: boolean
    justifyChildren?: Justify
    alignChildren?: Align,
    divProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  }

export const Flexbox = (
  props: FlexboxProps
) => <div
  style={{
    minWidth: 0,
    minHeight: 0,
    display: "flex",
    flexDirection: props.direction,
    flexWrap: (props.wrap ?? false) ? "wrap" : "nowrap",
    justifyContent:  
        enumMatch(props.justifyChildren ?? "start")({
          start: "flex-start",
          end: "flex-end",
          center: "center",
          spaceBetween: "space-between",
          spaceEvenly: "space-evenly",
          spaceAround: "space-around"
        }),
    alignItems: props.alignChildren,
    ...buildStyle(props)
  }}
  onClick={props.onClick}
  children={props.children}
  {...props.divProps}
/>

export const Flex = Flexbox


export const Col = (
  props: FlexboxProps
) =>  <Flexbox direction="column" {...props}/>

export const Row = (
  props: FlexboxProps
) =>  <Flexbox direction="row" {...props}/>

