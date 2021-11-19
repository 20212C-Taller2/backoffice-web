import React from "react"
import HomeWork from "@material-ui/icons/HomeWork"
import { useNavigation } from "../hooks/navigation"
import { Col, Row } from "../primitives/Flexbox"
import { Space } from "../primitives/Frame"
import { Text } from "../primitives/Text"
import { Button, makeStyles } from "@material-ui/core"
import { IO } from "../utils/functional"


export const ImageDefault = (
  props: {
    text: string
    textButton?: string
    height?: number | string
    width?: number | string
    fontSize?: number | string
    logo?: React.ReactNode
    image?: string
    onClick?: IO<void>
  }
) => {
  const styles = useStyles()
  const navigation = useNavigation()

  return (
    <Col fillWidth>
      <Row fillWidth margin={10} justifyChildren={"center"}>
        <Col
          justifyChildren={"center"}
        >
          <Text 
            text={props.text} 
            style={{ color: "#5E6560", fontSize: props.fontSize ?? 40, fontWeight: "bold" }}
          />
          <Space height={50} />
          <Button 
            onClick={props.onClick ?? navigation.goTo.home} 
            className={styles.button}
            style={{height:40}}
          >
            <Text text={"Volver a inicio"} />
            { props.logo ??  <HomeWork fontSize="large" style={{marginLeft:12}}/> }
          </Button>
        </Col>  
      </Row>
    </Col>
  )
}

const useStyles = makeStyles({
  button: {  
    height: "6%", 
    fontWeight: "bold",
    backgroundColor: "#00c9a3",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    "&:hover": {
      backgroundColor: "#00d9b3",
    }
  }
})
