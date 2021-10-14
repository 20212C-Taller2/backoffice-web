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
      style={{ backgroundColor: "#F0F0F0" }}
    >
      <Navbar/>
      <Col fill >
        {props.children}
      </Col>
     
    </Col>
  )
}
