import React from "react"
import { Row } from "../primitives/Flexbox"
import { Col } from "../primitives/Flexbox"
import { Picture } from "../primitives/Picture"
import { Text } from "../primitives/Text"
import iconUbademy from "../../res/images/ubademy.svg"

export const MainLayout = (
  props: {
    children?: React.ReactNode
  }
) => {

  return (
    <Col
        fill
        style={{ backgroundColor: "lightblue" }}
    >
        <Row height={"20%"} style={{ backgroundColor: "#282C34" }} alignChildren="center">
            <Picture
                source={iconUbademy}
            />
            <Text
                color={"white"}
                text={"Ubademy"}
                fontSize={40}
            />
        </Row>
        <Col fill style={{ backgroundColor: "white" }}>
            {props.children}
        </Col>
    </Col>
  )
}

