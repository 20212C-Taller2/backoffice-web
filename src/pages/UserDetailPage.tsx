/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { Button, Chip, Paper } from "@material-ui/core"
import { useAdminUser } from "../hooks/context"
import { Col, Row } from "../primitives/Flexbox"
import { Loading, LoadingPage } from "../primitives/Loading"
import { Text } from "../primitives/Text"
import { useAsynchronous } from "../utils/asynchronism"
import { useLocation } from "react-router-dom"
import { Separator } from "../primitives/Separator"
import CheckCircle from "@material-ui/icons/CheckCircle"
import Sad from "@material-ui/icons/SentimentDissatisfied"
import Block from "@material-ui/icons/Block"
import Check from "@material-ui/icons/Check"
import { Window } from "../primitives/Window"
import { setTo, useStatefull } from "../utils/state"
import { sequenceIO } from "../utils/functional"
import Alert from "@material-ui/lab/Alert"
import Success from "@material-ui/icons/Done"


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
          <Row
            style={{borderBottom: "2px solid lightgray", marginBottom: 40, minHeight: "max-content"}}
            justifyChildren="start"
          >
            <Text 
              text={`Usuario: ${getUserAync.result.lastName} ${getUserAync.result.firstName}`} 
              bold 
              fontSize={40}
              fill
            />
            <Row
              alignChildren="center"
              fill
            >
              <Text 
                text={"Estado de cuenta: "} 
                bold 
                fontSize={40}
                margin={{ right: 20}}
              />
              <Chip
                color={getUserAync.result.blocked ? "secondary" : "primary"}
                label={getUserAync.result.blocked ? "BLOQUEADA" : "DESBLOQUEADA"}
              />
            </Row>
          </Row>
         
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
          <BlockUnblockButtons 
            userId={getUserAync.result.id}
            blocked={getUserAync.result.blocked}
          />
        </> : 
        <LoadingPage/> 
      }

    </Col>
  )
}

export const BlockUnblockButtons = (
  props: {
    userId: string
    blocked: boolean
    width?: number
  }
) => {
  const adminUser = useAdminUser()

  const blockUnblockUserAsync = useAsynchronous(adminUser.actions.blockUnblockUser)
  const openConfirmWindow = useStatefull(() => false)

  const runBlockUnblockUser = 
    (userId: string, block: boolean) => 
      blockUnblockUserAsync.run({credentials: adminUser.credentials, userId: userId, block: block})

  return(
    <>
      <Row
        alignChildren="center"
        justifyChildren="spaceEvenly"
        fill
      >
        <Button
          style={{
            color: props.blocked ? "#444444" : "white",
            border:  props.blocked ? "2px solid #327396" : "lightgray",
            borderRadius: 8,
            backgroundColor: props.blocked ? "#82c3e6" : "lightgray",
            padding: 5,
            width: props.width ?? 250,
          }}
          onClick={setTo(openConfirmWindow, true)}
          disabled={!props.blocked}
        >
          <Text text={"Desbloquear"} margin={{right:5}} color={props.blocked ? "#222222" : "white"}/>
          <Check style={{color: props.blocked ? "#327396" : "white"}}/>
        </Button>
        <Button
          style={{
            color: "#444444",
            border: props.blocked ? "2px solid lightgray" : "2px solid #a83C3C",
            borderRadius: 8,
            backgroundColor: props.blocked ? "lightgray" : "#F89C9C",
            padding: 5,
            width: props.width ?? 250,
          }}
          onClick={setTo(openConfirmWindow, true)}
          disabled={props.blocked}
        >
          <Text text={"Bloquear"} margin={{right:5}} color={props.blocked ? "white" : "#222222"}/>
          <Block style={{color: props.blocked ? "white" : "#a83C3C"}}/>
        </Button>
      </Row>
      <Window
        open={openConfirmWindow}
      >
        <Col 
          width={700} 
          margin={{ left: 20 }} 
          padding={20}
        >

          <Text
            text={`Desea ${props.blocked ? "desbloquear" : "bloquear"} a este usuario`}
            margin={{ bottom: 20 }}
            fontSize={25}
            style={{borderBottom: "2px solid lightgray"}}
          />
          {
            blockUnblockUserAsync.status === "failed" ? 
              <Alert style={{marginTop: 15}} severity="error">Correo electrónico o contraseña incorrecta</Alert> : 
              blockUnblockUserAsync.status === "completed" ?
                <Row>
                  <Success style={{marginRight: 10, background: "green", color: "white", borderRadius: "50%", padding: 2}}/>
                  <Text
                    text={`El usuario ha sido ${props.blocked ? "desbloqueado" : "bloqueado"} con éxito`}
                    margin={{ bottom: 20 }}
                    fontSize={20}
                  />
                </Row> :
                null
          }
          <Row
            justifyChildren="spaceBetween"
          >
            <Button
              color="default"
              type="submit"
              style={{width: "30%", marginTop: 50, alignSelf: "center"}}
              variant="contained"
              onClick={setTo(openConfirmWindow, false)}
              disabled={blockUnblockUserAsync.status === "running"}
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              type="submit"
              style={{width: "30%", marginTop: 50, alignSelf: "center"}}
              variant="contained"
              onClick={
                blockUnblockUserAsync.status !== "completed" ?
                  runBlockUnblockUser(props.userId, !props.blocked) :
                  setTo(openConfirmWindow, false)
              }
              disabled={blockUnblockUserAsync.status === "running"}
            >
              {            
                blockUnblockUserAsync.status === "running" ?
                  <Loading style={{ width: 25, height: 25, marginRight: 15, color: "white" }}/> 
                  : null 
              }
              {          
                blockUnblockUserAsync.status !== "completed" ?
                  "Confirmar" : "Aceptar"
              }
            </Button>
          </Row>

        </Col>
      </Window>
    </>
  )
} 