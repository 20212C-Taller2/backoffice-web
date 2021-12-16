/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Paper } from "@material-ui/core"
import React, { useEffect } from "react"
import { useAdminUser } from "../hooks/context"
import { Col, Row } from "../primitives/Flexbox"
import { Loading, LoadingPage } from "../primitives/Loading"
import { Column, ContentCell, HeaderCell, listDataProvider, Table } from "../primitives/Table"
import { Text } from "../primitives/Text"
import { useAsynchronous } from "../utils/asynchronism"
import { List } from "../utils/list"
import { User } from "../utils/serialization"
import { ImageDefault } from "../components/ImageDefault"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Block from "@material-ui/icons/Block"
import { Navigation, useNavigation } from "../hooks/navigation"
import { BlockUnblockButtons } from "./UserDetailPage"


export const UsersPage = () => {

  const adminUser = useAdminUser()
  const navigation = useNavigation()
  const getUsersAync = useAsynchronous(adminUser.actions.getUsers)

  const runGetUsersAsync = getUsersAync.run({credentials: adminUser.credentials})
  useEffect(runGetUsersAsync, [adminUser.credentials])
  
  return (
    <Col
      fill
      padding={40}
    >
      {
        getUsersAync.result !== undefined && getUsersAync.status === "completed"?
          <Paper style={{ marginTop: 10, height:"auto"}} elevation={1}>
            <Table<User>
              provider={listDataProvider(getUsersAync.result)}
              pageSize={10}
              keyExtractor={value => value.id}
              loadingView={<LoadingPage />}
              emptyView={<ImageDefault width={400} height={400} text={"No hay usuarios"} />}
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
): List<Column<User>> => [
  {
    header: <HeaderCell text={"Id"} textCenter />,
    render: it =>
      <ContentCell
        text={it.id}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Apellido y nombre"} textCenter />,
    render: it =>
      <ContentCell
        text={`${it.lastName} ${it.firstName}`}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Email"} textCenter />,
    render: it =>
      <ContentCell
        text={it.email}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Id de orden"} textCenter />,
    render: it =>
      <ContentCell
        text={it.placeId}
        textCenter
      />,
    grow: 1,
    width: 0,
  },
  {
    header: <HeaderCell text={"Acciones"} />,
    render: it =>
    <Row justifyChildren="spaceEvenly">
      <Button
        style={{
          color: "#444444",
          border: "1.5px solid #199bd2",
          borderRadius: 8,
          backgroundColor: "#c3e1f0",
          padding: 3,
          width: 200,
        }}
        onClick={navigation.goTo.detail.user(it.id)}
      > 
        <Text text={"Ver perfil"} margin={{right:5}} />
        <AccountCircle />
      </Button>
      <BlockUnblockButtons 
        userId={it.id} 
        blocked={it.blocked}
        width={170}
      />
    </Row>,
    grow: 1.5,
    width: 0,
  },
]