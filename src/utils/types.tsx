import { centerHorizontalStyle, centerStyle, centerVerticalStyle } from "../primitives/Frame"
import { IO } from "./functional"

export type Background = string | number | undefined
export type CssValue = string | number

export type Insets = CssValue | Positioning<CssValue> 

export type Positioning<T> = {
  top?: T
  left?: T
  right?: T
  bottom?: T
}


export const isCssValue = (value: unknown): value is CssValue => 
  typeof value === "number" || typeof value === "string" 

export type UiPrimitiveProps = {
  relativeToParent?: boolean
  centerInParent?: boolean
  centerHorizontal?: boolean
  centerVertical?: boolean
  alignLeft?: boolean
  alignRight?: boolean
  alignTop?: boolean
  alignBottom?: boolean
  height?: CssValue
  width?: CssValue
  fill?: boolean
  fillWidth?: boolean
  fillHeight?: boolean
  padding?: Insets
  margin?: Insets
  positioning?: Positioning<CssValue>
  style?: React.CSSProperties;
  onClick?: IO<void>
}

export const buildStyle = (
  props: UiPrimitiveProps
): React.CSSProperties => {

  const margins = isCssValue(props.margin) ? 
    {
      margin: props.margin
    } : 
    props.margin !== undefined ?
      {
        marginTop: props.margin.top,
        marginLeft: props.margin.left,
        marginRight: props.margin.right,
        marginBottom: props.margin.bottom
      } : {}


  const paddings = isCssValue(props.padding ) ? 
    {
      padding: props.padding
    } : 
    props.padding !== undefined ?
      {
        paddingTop: props.padding.top,
        paddingLeft: props.padding.left,
        paddingRight: props.padding.right,
        paddingBottom: props.padding.bottom
      } :  {}  

  const alignTop = props.alignTop ?? false
  const alignBottom = props.alignBottom ?? false
  const alignLeft = props.alignLeft ?? false
  const alignRight = props.alignRight ?? false
 
  const relativeToParent = props.relativeToParent ?? false

  const positioning =  
      {
        top:  alignTop ? 0 : props.positioning?.top,
        left: alignLeft ? 0 : props.positioning?.left,
        right: alignRight ? 0 : props.positioning?.right,
        bottom: alignBottom ? 0 : props.positioning?.bottom
      } 
  
  const fill = props.fill ?? false
  const fillWidth = props.fillWidth ?? false
  const fillHeight = props.fillHeight ?? false

  return {
    ...positioning,
    position: relativeToParent || alignTop || alignBottom || alignLeft || alignRight 
      ? "absolute" : "relative",
    ...(
      (props.centerInParent ?? false) ? centerStyle :
        (props.centerHorizontal ?? false) ? centerHorizontalStyle :
          (props.centerVertical ?? false) ? centerVerticalStyle : {}
    ),
    width:  fill || fillWidth  ? "100%" : props.width,
    height: fill || fillHeight ? "100%" : props.height,
    boxSizing: "border-box",
    MozBoxSizing: "border-box",
    WebkitBoxSizing: "border-box",
    ...margins,
    ...paddings,
    ...props.style
  }
}
