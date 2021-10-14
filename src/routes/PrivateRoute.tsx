import React from "react"
import { Col } from "../primitives/Flexbox"
import { Text } from "../primitives/Text"


export const AddAdministratorPage = () => {
  return (
    <Col
      fill
      padding={40}
    >
      <Text 
        fontSize={25}
        bold
        color={"#444444"}
        text={"Agregar administrador"}
        margin={{bottom:10}}
        padding={5}
        style={{borderBottom: "2px solid lightgray"}}
      />
    </Col>
  )
}
