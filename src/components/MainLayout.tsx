import React from "react"
import { Col } from "../primitives/Flexbox"
import { Navbar } from "./Navbar"

export const MainLayout = (
  props: {
    children?: React.ReactNode,
  }
) => {

  return (
    <Col
      fill 
    >
      <Navbar/>
      <Col fill >
        {props.children}
      </Col>
     
    </Col>
  )
}
