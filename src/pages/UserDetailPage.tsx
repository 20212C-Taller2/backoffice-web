/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { Button, Paper } from "@material-ui/core"
import { useAdminUser } from "../hooks/context"
import { Col, Row } from "../primitives/Flexbox"
import { LoadingPage } from "../primitives/Loading"
import { Text } from "../primitives/Text"
import { useAsynchronous } from "../utils/asynchronism"
import { useLocation } from "react-router-dom"
import { Separator } from "../primitives/Separator"
import CheckCircle from "@material-ui/icons/CheckCircle"
import Sad from "@material-ui/icons/SentimentDissatisfied"
import Block from "@material-ui/icons/Block"
import Check from "@material-ui/icons/Check"


export const UserDetailPage = () => {

  const adminUser = useAdminUser()
  
  const { pathname } = useLocation()
  const splitedPathname = pathname.split("/")
  const id = splitedPathname[(splitedPathname.length)-1]

  const getUserAync = useAsynchronous(adminUser.actions.getUser)

  const runGetUserAsync = getUserAync.run({credentials: adminUser.credentials, userId: id})
  useEffect(runGetUserAsync, [id])

  return (
    <Col
      fill
      padding={40}
    >
      {
        getUserAync.result !== undefined && getUserAync.status === "completed"?
        <>
          <Text text={`Usuario: ${getUserAync.result.lastName} ${getUserAync.result.firstName}`} bold fontSize={40}/>
          <Separator style={{marginBottom: 20}}/>
         
          <Paper 
            style={{ marginTop: 10, height:"auto"}} 
            elevation={5}
          >
            <Col
              padding={20}
            >
                <Text text={"Datos personales "} bold fontSize={30}/>
                <Separator style={{marginBottom: 20}}/>
                <Text text={`• Id de usuario: ${getUserAync.result.id}`} fontSize={20}/>
                <Text text={`• Apellido y nombre: ${getUserAync.result.lastName} ${getUserAync.result.firstName}`} fontSize={20}/>
                <Text text={`• Email: ${getUserAync.result.email}`} fontSize={20}/>
            </Col>
          </Paper>
          <Paper 
            style={{ marginTop: 10, height:"auto"}} 
            elevation={5}
          >
            <Col
              padding={20}
            >
                <Text text={"Intereses "} bold fontSize={30}/>
                <Separator style={{marginBottom: 20}}/>

                {
                  getUserAync.result.interests.length !== 0 ?
                    getUserAync.result.interests.map((field, index) =>
                      <Row
                        justifyChildren="start"
                        key={index}
                        alignChildren={"center"}
                        padding={ 0}
                        width={"100%"}
                        margin={{ bottom: 15 }}      
                      >



                          <CheckCircle color={"primary"} style={{padding: 5}}/>
                          <Text 
                            text={field}
                            bold
                          />
          
                      </Row>
                    ) :
                    <Col alignChildren="center">
                      <Sad style={{fontSize: 60}}/>
                      <Text text={"El usuario no tiene intereses"} margin={{top:20}} bold fontSize={20}/>
                    </Col>
                }
       
            </Col>
          </Paper>
          <BlockUnblockButtons userId={getUserAync.result.id}/>
        </> : 
        <LoadingPage/> 
      }

    </Col>
  )
}

export const BlockUnblockButtons = (
  props: {
    userId: string
    width?: number
  }
) => {
  const adminUser = useAdminUser()

  const blockUnblockUserAsync = useAsynchronous(adminUser.actions.blockUnblockUser)
  
  const runBlockUnblockUser = 
    (userId: string, block: boolean) => 
      blockUnblockUserAsync.run({credentials: adminUser.credentials, userId: userId, block: block})

  return(
    <Row
      alignChildren="center"
      justifyChildren="spaceEvenly"
      fill
    >
      <Button
        style={{
          color: "#444444",
          border: "2px solid #327396",
          borderRadius: 8,
          backgroundColor: "#82c3e6",
          padding: 5,
          width: props.width ?? 250,
        }}
        onClick={runBlockUnblockUser(props.userId, false)}
      >
        <Text text={"Desbloquear"} margin={{right:5}} color="#222222"/>
        <Check style={{color: "#327396"}}/>
      </Button>
      <Button
        style={{
          color: "#444444",
          border: "2px solid #a83C3C",
          borderRadius: 8,
          backgroundColor: "#F89C9C",
          padding: 5,
          width: props.width ?? 250,
        }}
        onClick={runBlockUnblockUser(props.userId, true)}
      >
        <Text text={"Bloquear"} margin={{right:5}} color="#222222"/>
        <Block style={{color: "#a83C3C"}}/>
      </Button>
    </Row>
  )
} 