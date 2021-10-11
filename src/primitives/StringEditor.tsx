import React from "react"
import { IconButton, TextField, TextFieldProps } from "@material-ui/core"
import { IO } from "../utils/functional"
import { List } from "../utils/list"
import { setTo, State } from "../utils/state"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

export const StringEditor = (
  props: {
    state?: State<string>
    value?: string
    label?: string
    type?: "normal" | "email" | "password"
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    showErrors?: boolean
    showPassword?: State<boolean>
    valid?: boolean
    placeholder?: string
    style?: React.CSSProperties
    errorList?: List<string>
    onKeyPressed?: (key: string) => IO<void>
    className?: string
    rows?: number
    disable?: boolean
    readonly?: boolean
  }
) =>  {
  const error = ((props.valid === false) || props.showErrors) ?? false

  return (
    <Input
      style={props.style}
      variant="outlined"
      state={props.state}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      label={props.label}
      error={error}
      helperText={
        error ? props.errorList?.join(", ") : undefined
      }
      onKeyPress={(event) => {
        props.onKeyPressed?.(event.key)()
      }}
      className={props.className}
      rows={props.rows}
      disable={props.disable}
      readonly={props.readonly}
      showPassword={props.showPassword}
      prefix={props.prefix}
      suffix={props.suffix}
    />
  )
}


const Input = (
  props: TextFieldProps & {
    value?: string
    state?: State<string>
    rows?: number
    disable?: boolean
    readonly?: boolean
    showPassword?: State<boolean>
    prefix?: React.ReactNode
    suffix?: React.ReactNode
  }
) =>
  <TextField
    multiline={props.rows === undefined ? false : true}
    rows={props.rows}
    value={props.state !== undefined ? props.state?.value : props.value}
    onChange={event => props.state !== undefined ? setTo(props.state, event.target.value)() : undefined}
    type={
      props.showPassword === undefined ? 
        "text" : 
        props.showPassword.value ? "text" : "password"
    }
    disabled={props.disable}
    InputProps={{
      readOnly: props.readonly,
      startAdornment: props.prefix,
      endAdornment: props.type === "password" && props.showPassword !== undefined?
        <IconButton
          aria-label="toggle password visibility"
          onClick={setTo(props.showPassword, !props.showPassword?.value)}
          onMouseDown={(event) => event.preventDefault()}
          edge="end"
        >
          {props.showPassword.value ? <Visibility /> : <VisibilityOff />}
        </IconButton> : props.suffix
    }}
    {...props}
  />
