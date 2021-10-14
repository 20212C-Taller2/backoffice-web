import {Dialog} from "@material-ui/core"
import React from "react"
import { setTo, State } from "../utils/state"

export const Window= (
  props: {
    open: State<boolean>
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
    children?: React.ReactNode
    fullWidth?: boolean
    style?: React.CSSProperties
    disableBackdropClick?: boolean
  }
) => <Dialog
  open={props.open.value}
  onClose={setTo(props.open, false)}
  maxWidth={props.maxWidth ?? "xl"}
  children={props.children}
  fullWidth={props.fullWidth}
  style={props.style}
  disableBackdropClick={props.disableBackdropClick?? false}
/>
  
