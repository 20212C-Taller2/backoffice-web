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
import Close from "@material-ui/icons/Close"
import { Window } from "../primitives/Window"
import { setTo, useStatefull } from "../utils/state"
import { nop, sequenceIO } from "../utils/functional"
import Alert from "@material-ui/lab/Alert"
import Success from "@material-ui/icons/Done"
import Assignment from "@material-ui/icons/Assignment"
import { ExamWindow } from "../windows/ExamWindow"
import { useNavigation } from "../hooks/navigation"


export const CourseDetailPage = () => {

  const adminUser = useAdminUser()
  
  const { pathname } = useLocation()
  const splitedPathname = pathname.split("/")
  const id = splitedPathname[(splitedPathname.length)-1]
  const navigation = useNavigation()

  const getCourseAsync = useAsynchronous(adminUser.actions.getCourse)

  const openExamWindow = useStatefull(() => false)
  const currentExam = useStatefull<undefined | number>(() => undefined)

  const runGetCourseAsync = getCourseAsync.run({credentials: adminUser.credentials, courseId: id})
  useEffect(runGetCourseAsync, [id])

  return (
    <Col
      fill
      padding={20}
    >
      {
        getCourseAsync.result !== undefined && getCourseAsync.status === "completed" ?
        <>
          <Row
            style={{borderBottom: "2px solid lightgray", marginBottom: 20, minHeight: "max-content"}}
            justifyChildren="start"
            padding={20}
          >
            <Text 
              text={`Curso: ${getCourseAsync.result.course.title}`} 
              bold 
              fontSize={40}
              fill
            />
          </Row>
          <Row
            fill
            justifyChildren="spaceBetween"
            style={{minHeight: "max-content"}}
            padding={20}
          >
            <Paper 
              style={{ marginTop: 10, width: "48%"}} 
              elevation={5}
            >
              <Col
                padding={20}
              >
                <Text text={"Detalle del curso "} bold fontSize={30}/>
                <Separator style={{marginBottom: 20}}/>
                <Row  alignChildren="center">
                  <CheckCircle color={"primary"} style={{padding: 5}}/>
                  <Text text={`Id del curso: ${getCourseAsync.result.course.id}`} fontSize={20}/>
                </Row>
                <Row  alignChildren="center">
                  <CheckCircle color={"primary"} style={{padding: 5}}/>
                  <Text text={`Nombre del curso: ${getCourseAsync.result.course.title}`} fontSize={20}/>
                </Row>
                <Row  alignChildren="center">
                  <CheckCircle color={"primary"} style={{padding: 5}}/>
                  <Text text={`Detalle del curso: ${getCourseAsync.result.course.description}`} fontSize={20}/>
                </Row>
                <Row  alignChildren="center">
                  <CheckCircle color={"primary"} style={{padding: 5}}/>
                  <Text text={`Tipo de curso: ${getCourseAsync.result.course.type}`} fontSize={20}/>
                </Row>
                <Row  alignChildren="center">
                  <CheckCircle color={"primary"} style={{padding: 5}}/>
                  <Text text={`Tipo de subscripción: ${getCourseAsync.result.course.subscription}`} fontSize={20}/>
                </Row>
                <Row  alignChildren="center">
                  <CheckCircle color={"primary"} style={{padding: 5}}/>
                  <Text text={`Locación: ${getCourseAsync.result.course.location}`} fontSize={20}/>
                </Row>
                <Row  alignChildren="center">
                  <CheckCircle color={"primary"} style={{padding: 5}}/>
                  <Text text={`Cantidad de alumnos: ${getCourseAsync.result.course.students.length}`} fontSize={20}/>
                </Row>
                <Row  alignChildren="center">
                  <CheckCircle color={"primary"} style={{padding: 5}}/>
                  <Text text={`Cantidad de colaboradores: ${getCourseAsync.result.collaborators.length}`} fontSize={20}/>
                </Row>
                <Row  alignChildren="center">
                  <CheckCircle color={"primary"} style={{padding: 5}}/>
                  <Text text={`Cantidad de examenes: ${getCourseAsync.result.course.exams.length}`} fontSize={20}/>
                </Row>
              </Col>
            </Paper>
            <Paper 
              style={{ marginTop: 10, width: "48%"}} 
              elevation={5}
            >
              <Col
                padding={20}
              >
                  <Text text={"Detalle del creador "} bold fontSize={30}/>
                  <Separator style={{marginBottom: 20}}/>
                  <Row  alignChildren="center">
                    <CheckCircle color={"primary"} style={{padding: 5}}/>
                    <Text text={`Id: ${getCourseAsync.result.creator.id}`} fontSize={20}/>
                  </Row>
                  <Row  alignChildren="center">
                    <CheckCircle color={"primary"} style={{padding: 5}}/>
                    <Text 
                      text={
                        `Apellido y nombre: 
                        ${getCourseAsync.result.creator.googleData?.displayName !== undefined ? 
                          getCourseAsync.result.creator.googleData?.displayName : 
                          getCourseAsync.result.creator.lastName + " "+ getCourseAsync.result.creator.firstName}`
                      } 
                      fontSize={20}
                    />
                  </Row>
                  <Row  alignChildren="center">
                    <CheckCircle color={"primary"} style={{padding: 5}}/>
                    <Text text={`Email: ${getCourseAsync.result.creator.email}`} fontSize={20}/>
                  </Row>
              </Col>
            </Paper>
          </Row>
          <Row
            fill
            justifyChildren="spaceBetween"
            style={{minHeight: "max-content"}}
            padding={20}
          >
            <Paper 
              style={{ marginTop: 30, width: "48%"}} 
              elevation={5}
            >
              <Col
                padding={20}
              >
                  <Text text={"Examenes "} bold fontSize={30}/>
                  <Separator style={{marginBottom: 20}}/>

                  {
                    getCourseAsync.result.course.exams.length !== 0 ?
                      getCourseAsync.result.course.exams.map((exam, index) =>
                        <Row
                          justifyChildren="spaceBetween"
                          key={index}
                          alignChildren={"center"}
                          padding={ 0}
                          width={"100%"}
                          margin={{ bottom: 15 }}      
                        >
                            <Row
                              alignChildren={"center"}
                            >
                              <CheckCircle color={"primary"} style={{padding: 5}}/>
                              <Text 
                                  text={exam.title}
                                  bold
                              />
                            </Row>
                            <Button
                              style={{
                                  color: "#444444",
                                  border: "1.5px solid #199bd2",
                                  borderRadius: 8,
                                  backgroundColor: "#c3e1f0",
                                  padding: 3,
                                  width: 200,
                              }}
                              onClick={sequenceIO([setTo(currentExam, index), setTo(openExamWindow, true)])}
                            > 
                              <Text text={"Ver Examen"} margin={{right:5}} />
                              <Assignment />
                            </Button>
                        </Row>
                      ) :
                      <Col alignChildren="center">
                        <Sad style={{fontSize: 60}}/>
                        <Text text={"El curso no tiene examenes"} margin={{top:20}} bold fontSize={20}/>
                      </Col>
                  }
        
              </Col>
            </Paper>
            <Paper 
              style={{ marginTop: 30, width: "48%"}} 
              elevation={5}
            >
              <Col
                padding={20}
              >
                  <Text text={"Colaboradores "} bold fontSize={30}/>
                  <Separator style={{marginBottom: 20}}/>
                  {
                    getCourseAsync.result.collaborators.length !== 0 ?
                      getCourseAsync.result.collaborators.map((collaborator, index) =>
                        <Row
                          justifyChildren="spaceBetween"
                          key={index}
                          alignChildren={"center"}
                          padding={ 0}
                          width={"100%"}
                          margin={{ bottom: 15 }}      
                        >
                            <Row
                              alignChildren={"center"}
                            >
                              <CheckCircle color={"primary"} style={{padding: 5}}/>
                              <Text 
                                text={`${collaborator.googleData?.displayName !== undefined ?  
                                  collaborator.googleData?.displayName : collaborator.lastName + " " +collaborator.firstName}`
                                }
                                bold
                              />
                            </Row>
                            <Button
                              style={{
                                  color: "#444444",
                                  border: "1.5px solid #199bd2",
                                  borderRadius: 8,
                                  backgroundColor: "#c3e1f0",
                                  padding: 3,
                                  width: 200,
                              }}
                              onClick={navigation.goTo.detail.user(collaborator.id)}
                            > 
                              <Text text={"Ver perfil"} margin={{right:5}} />
                              <Assignment />
                            </Button>
                        </Row>
                      ) :
                      <Col alignChildren="center">
                        <Sad style={{fontSize: 60}}/>
                        <Text text={"El curso no tiene colaboradores"} margin={{top:20}} bold fontSize={20}/>
                      </Col>
                  }

              </Col>
            </Paper>
          </Row>      
          {
            currentExam.value !== undefined && getCourseAsync.result.course.exams.length > 0?
                <ExamWindow
                    openWindow={openExamWindow}
                    exam={getCourseAsync.result.course.exams[currentExam.value]}
                /> : null
          }        
        </> : 
        <LoadingPage/> 
      }
    </Col>
  )
}

const DeleteCourseButton = (
  props: {

  }
) => {
  const openConfirmWindow = useStatefull(() => false)

  return(
    <>
      <Button
        style={{
          color: "#444444",
          border: "2px solid #a83C3C",
          borderRadius: 8,
          backgroundColor: "#F89C9C",
          padding: 5,
          width: 250,
          alignSelf: "center"
        }}
        onClick={nop}
      >
        <Text text={"Borrar curso"} margin={{right:5}} color={"#a83C3C" }/>
        <Close style={{color: "#a83C3C"}}/>
      </Button>

      {/* <Window
        open={openConfirmWindow}
      >
        <Col 
          width={700} 
          margin={{ left: 20 }} 
          padding={20}
        >

          <Text
            text={"Está seguro de querer borrar este curso ?"}
            margin={{ bottom: 20 }}
            fontSize={25}
            style={{borderBottom: "2px solid lightgray"}}
          />
          {
            blockUnblockUserAsync.status === "failed" ? 
              <Alert style={{marginTop: 15}} severity="error">Algo ha fallado, por favor vuelve a intentarlo</Alert> : 
              blockUnblockUserAsync.status === "completed" ?
                <Row>
                  <Success style={{marginRight: 10, background: "green", color: "white", borderRadius: "50%", padding: 2}}/>
                  <Text
                    text={"El curso ha sido borrado con éxito"}
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
      </Window> */}
    </>
  )
}