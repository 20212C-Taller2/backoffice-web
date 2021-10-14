import { Button } from "@material-ui/core"
import React from "react"
import iconUbademy from "../../res/images/ubademy.svg"
import { useUbademyUser } from "../hooks/context"
import { useNavigation } from "../hooks/navigation"
import { Row } from "../primitives/Flexbox"
import { Picture } from "../primitives/Picture"
import { Text } from "../primitives/Text"
import { DrawerButton } from "./DrawerButton"


export const Navbar = () => {
  const ubademyUser = useUbademyUser()
  const navigation = useNavigation()

  return(
    <Row 
      style={{ backgroundColor: "#282C34" }} 
      alignChildren="center" 
      justifyChildren="spaceBetween"
      padding={5}
    >
      <Row
        alignChildren="center"
        onClick={navigation.goTo.home}
        style={{cursor: "pointer"}} 
      >
        <Picture
          style={{ maxHeight: "100%", width: "auto" }}
          source={iconUbademy}
        />
        <Text
          color={"white"}
          text={"Ubademy"}
          fontSize={40}
        />
      </Row>
      {
        ubademyUser?.type === "admin" ?
          <>
            <Button 
              children={<Text text={"Administrar usuarios"} fontSize={16}/>}
              style={{color:"white"}}
            />
            <Button 
              children={<Text text="Agregar administrador" fontSize={16}/>}
              style={{color:"white"}}
              onClick={navigation.goTo.addAdmin}
            />
            <Button 
              children={<Text text="Administrar cursos" fontSize={16}/>}
              style={{color:"white"}}
            />
            <Button 
              children={<Text text="Ver estadisticas" fontSize={16}/>}
              style={{color:"white"}}
            />
            <DrawerButton/>
          </> : 
          null
      }
    </Row>
  )
}
