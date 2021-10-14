import { Button, Drawer } from "@material-ui/core"
import React from "react"
import { useAdminUser } from "../hooks/context"
import { Col, Row } from "../primitives/Flexbox"
import { Text } from "../primitives/Text"
import { setTo, State } from "../utils/state"
import { AvatarInitials } from "./DrawerButton"
import Check from "@material-ui/icons/Check"
import { Frame } from "../primitives/Frame"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { sequenceIO } from "../utils/functional"
import { useNavigation } from "../hooks/navigation"

export const ProfileDrawer = (
  props: {
      open: State<boolean>
    }
) => {
  
  const adminUser = useAdminUser()
  const adminData = adminUser.credentials.user
  const navigation = useNavigation()

  return(
    <Drawer
      anchor="right"
      open={props.open.value}
      onClose={setTo(props.open, false)}
    >
      <Col 
        fill
        style={{background: "#282C34", width: 600}}
        alignChildren={"center"}
      >
        <AvatarInitials
          style={{width: 60, height: 60, marginTop: 15, marginBottom: 15,  backgroundColor:"#c3e1f0"}}
        />
        <Text
          text={adminData.firstName.toLocaleUpperCase() + " " +adminData.lastName.toLocaleUpperCase()}
          color={"white"}
        />

        <DrawerSectionTitle
          children={"Información General"}
        />
        <Row
          fill
          justifyChildren="spaceEvenly"
        >
          <Col>
            <DataField
              title={"Nombre y apellido"}
              value={adminData.firstName + " " + adminData.lastName}
            />
            <DataField
              title={"Email"}
              value={adminData.email}
            />
          </Col>
          <DataField
            title={"Rol"}
            value={"Administrador"}
          />
        </Row>
        <Button
          style={{marginBottom: 40, backgroundColor: "#484C44", borderRadius: 5, padding: 10}}
          onClick={sequenceIO([navigation.goTo.login, adminUser.actions.logout])}
        >
          <ExitToAppIcon
            style={{color:"white"}}
          />
          <Text
            text={"Cerrar sesión"}
            color={"white"}
          />
        </Button>
      </Col>
    </Drawer>
  )
}


const DrawerSectionTitle = (
  props: {
      children: string 
    }
) => {
  
  return (
    <Frame 
      padding={10}
      margin={{bottom:20, top: 40}}
      style={{borderRadius:5, backgroundColor: "#484C44", width:"90%"}}
    >
      <Row
        fill 
        justifyChildren="spaceBetween"
        alignChildren="center"
      >
        <Text 
          color={"white"}
          text={props.children}
          style={{textTransform: "uppercase"}}
        />
        <Check style={{color: "white"}}/>
      </Row>
    </Frame>
  )
}

const DataField = (
  props:{
      title: string
      value?: string
    }
) => {
  return (
    <Col
      margin={{bottom:20}}
    >
      <Text
        text={props.title.toUpperCase()}
        color={"#888C84"}
      />
      <Text
        text={props.value}
        color={"whitesmoke"}
      />
    </Col>
  )
}
  