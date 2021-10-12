import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { MainLayout } from "..//components/MainLayout"


export const PrivateRoute =(
  props: {

  }
)=> {
  return (
    <>
      render={props => localStorage.getItem("token") ?
        <MainLayout {...props}>
          <Component {...props} />
        </MainLayout> :
        <Redirect to={"/"} />
      } />
  )
}
