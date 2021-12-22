import React from "react"
import { Col } from "../primitives/Flexbox"
import { Frame } from "../primitives/Frame"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"

export const MainLayout = (
  props: {
    children?: React.ReactNode,
  }
) => {

  return (
    <Frame
      fill 
    >
      <Navbar/>
      <Frame fill>
        {props.children}
      </Frame>
      <Footer/>
    </Frame>
  )
}
