import React, { CSSProperties } from "react"
import { openLink } from "../utils/utils"

export const Hyperlink = (
  props: {
    url: string
    text?: string
    newPage?: boolean
    prefix?: React.ReactNode
    sufix?: React.ReactNode
    bold?: boolean
    fontSize?: string | number
    noUnderline?: boolean
    style?: CSSProperties
  }
) => <a
      rel="noopener noreferrer"
      target={props.newPage === true ?"_blank" : ""}
      style={props.noUnderline === true ? 
        {textDecoration: "none", fontSize:props.fontSize, ...props.style, cursor: "pointer", ...customStyle  } : 
        {fontSize:props.fontSize, ...props.style , cursor: "pointer", ...customStyle}
      } 
      onClick={openLink(props.url)}
    >   
      {props.prefix}
      {props.bold === true ? <strong>{props.text}</strong>:props.text}
      {props.sufix}
    </a>

const customStyle: CSSProperties = ({
  display: "flex",
  alignItems:"center",
  fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
  color: "gray"
})
