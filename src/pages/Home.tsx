import React from "react"
import { Col, Row } from "../primitives/Flexbox"
import { Text } from "../primitives/Text"
import Check from "@material-ui/icons/CheckCircle"



export const Home = () => {

  return (
    <Col 
      fill
      padding={40} 
    >
      <Text 
        text={"Backoffice Ubademy"}
        color="#444444"
        fontSize={26}
        bold
        margin={{bottom: 20}}
        style={{ borderBottom: "2px solid lightgray" }}
      />
      <Row  alignChildren="center" margin={15}>
        <Check color={"primary"} style={{padding: 5}}/>
        <Text 
          text={"Administrar usuarios: Lista de usuarios de ubademy"}
          color="#444444"
          fontSize={14}
          bold
        />
      </Row>
      <Row  alignChildren="center" margin={15}>
        <Check color={"primary"} style={{padding: 5}}/>
        <Text 
          text={" Agregar administrador: Agregar nuevo administrador al backoffice"}
          color="#444444"
          fontSize={14}
          bold
        />
      </Row>
      <Row  alignChildren="center" margin={15}>
        <Check color={"primary"} style={{padding: 5}}/>
        <Text 
          text={"Administrar cursos: Listado de todos los cursos de la plataforma y opciones para crear y/o modificar los mismos"}
          color="#444444"
          fontSize={14}
          bold
        />
      </Row>
      <Row  alignChildren="center" margin={15}>
        <Check color={"primary"} style={{padding: 5}}/>
        <Text 
          text={"Ver estadisticas: Estadisticas actuales sobre la plataforma"}
          color="#444444"
          fontSize={14}
          bold
        />
      </Row>
    </Col>
  )
}
