/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Paper } from "@material-ui/core"
import { useEffect } from "react"
import { useAdminUser } from "../hooks/context"
import { Col } from "../primitives/Flexbox"
import { LoadingPage } from "../primitives/Loading"
import { Column, ContentCell, HeaderCell, listDataProvider, Table } from "../primitives/Table"
import { useAsynchronous } from "../utils/asynchronism"
import { List } from "../utils/list"
import { Course } from "../utils/serialization"
import { ImageDefault } from "../components/ImageDefault"
import { Navigation, useNavigation } from "../hooks/navigation"
import { Text } from "../primitives/Text"
import Ballot from "@material-ui/icons/Ballot"

export const CoursesPage = () => {

  const adminUser = useAdminUser()
  const navigation = useNavigation()
  const getCoursesAync = useAsynchronous(adminUser.actions.getCourses)
  const runGetCoursesAsync = getCoursesAync.run({credentials: adminUser.credentials})
  useEffect(runGetCoursesAsync, [adminUser.credentials])

  return (
    <Col
      fill
      padding={40}
    >
      {
        getCoursesAync.result !== undefined && getCoursesAync.status === "completed"?
          <Paper style={{ marginTop: 10, height:"auto"}} elevation={1}>
            <Table<Course>
              provider={listDataProvider(getCoursesAync.result)}
              pageSize={10}
              keyExtractor={value => value.id.toString()}
              loadingView={<LoadingPage />}
              emptyView={<ImageDefault width={400} height={400} text={"No hay cursos"} />}
              columnList={columns(navigation)}
            />
          </Paper> :
          <LoadingPage/> 
      }

    </Col>
  )
}

const columns = (
  navigation: Navigation
): List<Column<Course>> => [
  {
    header: <HeaderCell text={"Id de curso"} textCenter />,
    render: it =>
      <ContentCell
        text={it.id.toString()}
        textCenter
      />,
    grow: 0.1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Nombre de curso"} textCenter />,
    render: it =>
      <ContentCell
        text={it.title}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Tipo de Curso"} textCenter />,
    render: it =>
      <ContentCell
        text={it.type}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Tipo de subscripción"} textCenter />,
    render: it =>
      <ContentCell
        text={it.subscription}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Id del creador"} textCenter />,
    render: it =>
      <ContentCell
        text={it.title}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Cantidad de alumnos"} textCenter />,
    render: it =>
      <ContentCell
        text={it.students.length.toString()}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Cantidad de colaboradores"} textCenter />,
    render: it =>
      <ContentCell
        text={it.collaborators.length.toString()}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Cantidad de examenes"} textCenter />,
    render: it =>
      <ContentCell
        text={it.exams.length.toString()}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Acciones"} textCenter />,
    render: it =>
        <Button
          style={{
            color: "#444444",
            border: "1.5px solid #199bd2",
            borderRadius: 8,
            backgroundColor: "#c3e1f0",
            padding: 3,
            width: 200,
          }}
          onClick={navigation.goTo.detail.course(it.id.toString())}
        > 
          <Text text={"Ver curso"} margin={{right:5}} />
          <Ballot />
        </Button>,
    grow: 1,
    width: 0,
  }
]