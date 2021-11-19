import { CircularProgress } from "@material-ui/core"
import React from "react"
import { centerStyle, Frame } from "./Frame"

export const Loading = CircularProgress

export const LoadingPage = () => 
  <Frame fillWidth height={600}>
    <Loading 
      style={{  
        position: "absolute",
        top: "50%",
        left: "50%"
      }} 
      size={100}
    />
  </Frame>
