import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { LocalDate } from "js-joda"
import { Text } from "../primitives/Text"
import { Button } from "@material-ui/core"
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import { Row } from "./Flexbox"
import { setTo, State, useStatefull } from "../utils/state"
import { List } from "../utils/list"
import { sequenceIO } from "../utils/functional"

export const DateEditor = (
  props: {
    state: State<LocalDate | undefined>
    label?: string
    style?: React.CSSProperties
    errorList?: List<string>
    showErrors?: boolean
    max?: LocalDate
    min?: LocalDate
  }
) => {

  const showDatePicker = useStatefull(() => false)

  return <MuiPickersUtilsProvider utils={DateFnsUtils} >
    <DatePicker
      open={showDatePicker.value}
      onOpen={setTo(showDatePicker, true)}
      onClose={setTo(showDatePicker, false)}
      style={props.style}
      label={props.label}
      variant="inline"
      inputVariant="outlined"
      error={props.showErrors}
      helperText={(props.showErrors ?? false) ? props.errorList?.join(", ") : undefined}
      format={"dd/MM/yyyy"}
      value={getJsDate(props.state?.value) ?? null}
      onChange={event => props.state !== undefined ? 
        sequenceIO([setTo(props.state, getLocalDate(event)), setTo(showDatePicker, false)])() 
        : undefined 
      }
      maxDate={getJsDate(props.max)}
      minDate={getJsDate(props.min)}
    />
  </MuiPickersUtilsProvider>
}

const getJsDate = (date?: LocalDate): Date | undefined => 
    date !== undefined ? new Date(date.year(), date.monthValue() - 1, date.dayOfMonth()) : undefined

const getLocalDate = (date: Date | null): LocalDate | undefined => {
  return date !== null ? LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate()) : undefined
}
