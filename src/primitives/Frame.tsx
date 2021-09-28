import React from "react"
import { IO } from "../utils/functional"
import { buildStyle, UiPrimitiveProps } from "../utils/types"

export type FrameProps = UiPrimitiveProps & {
    children?: React.ReactNode
    style?: React.CSSProperties;
    onClick?: IO<void>
    divProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

export const Frame = (
  props: FrameProps
) => 
  <div
    style={{
      ...buildStyle(props)
    }}
    onClick={props.onClick}
    children={props.children}
    {...props.divProps}
  />


export const Space = Frame

export const centerStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
}

export const centerHorizontalStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, 0%)"
}

export const centerVerticalStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translate(0%, -50%)"
}

export const variableHorizontalAlignmentStyle = (leftPercentageDistance: number): React.CSSProperties => ({
  position: "absolute",
  top: "50%",
  left: `${leftPercentageDistance}%`,
  transform: `translate(-${leftPercentageDistance}%, -50%)`
})
