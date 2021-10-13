import React from "react"
import { Redirect, Route } from "react-router-dom"
import { MainLayout } from "..//components/MainLayout"
import { Col } from "../primitives/Flexbox"
import { Text } from "../primitives/Text"


export const PrivateRoute =(
  props: {

  }
)=> {
  return (
    <Col>
      <Text text={"TE LOGUEASTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"}/>
    </Col>
  )
}
