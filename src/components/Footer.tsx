import { LocalDate } from "js-joda"
import React, { useMemo } from "react"
import { Col, Flex, Row } from "../primitives/Flexbox"
import { Frame } from "../primitives/Frame"
import { Hyperlink } from "../primitives/Hyperlink"
import { Picture } from "../primitives/Picture"
import { Text } from "../primitives/Text"
import { Window } from "../primitives/Window"
import { IO } from "../utils/functional"
import { List } from "../utils/list"
import { setTo, useStatefull } from "../utils/state"
import { openLink } from "../utils/utils"
import iconUbademy from "../../res/images/ubademy.svg"
import iconYoutube from "../../res/images/youtube.png"
import iconLinkedin from "../../res/images/linkedin.svg"
import iconInstagram from "../../res/images/instagram.svg"
import iconFacebook from "../../res/images/facebook.svg"
import logoFiuba from "../../res/images/logo_fiuba.png"

const useToday = () => useMemo(() => LocalDate.now(), [])

export const Footer = () => {

  const currentYear = useToday().year().toString()

  return (
    <Col 
      fillWidth
      height={"max-content"}
      style={{ backgroundColor: "#282C34", minHeight: "max-content" }} 
      //style={{ backgroundImage: `url(${appLabel.urls.footerBackgroundImage})` }}
    >
      <Col
        fillWidth
        padding={40}
        alignChildren="center"
        justifyChildren="spaceEvenly"
        wrap={true}
      >
        <Flex 
          fillWidth 
          justifyChildren="spaceAround"
          direction={"row"}
          alignChildren={"start"}
        >      
          <Logo/>
          <Col>
            <Text color={"White"} text={"Ubademy"} margin={{bottom:12}}/>
            <Hyperlink url={`mailto:${"comunicacion@fi.uba.ar"}`} text={"comunicacion@fi.uba.ar"}/>
            <Text color={"white"} text={"Av. Paseo Colón 850 - C1063ACV - Buenos Aires - Argentina"} margin={{bottom:10, top:10}}/>
            <Text color={"white"} text={"Tel +54 (11) 528-50401"} margin={{bottom:40}}/>
          </Col>

          <FooterSocialNetworks/>
        </Flex>
        <Row 
          margin={{top:30}} 
          style={{width:"90%", borderBottom: "1px solid white"}}
          alignChildren="center"
        />
        <Text 
          margin={{top:30}} 
          color={"white"}
          text={"Ubademy {{year}} © Todos los derechos reservados".replace("{{year}}", currentYear)}
        />
      </Col>
    </Col>
  )
}

const Logo = () => {
  return <Col alignChildren={"center"} margin={{bottom:40}}>
    <Picture source={logoFiuba} alt={"Logo ubademy"} width={290}/>
    <Text 
      margin={{top:15}}
      text={"El cuchitril de los mejores cursos"}
      color={"white"}
    />
  </Col>
}

const FooterSocialNetworks = () => {

  return (
    <Col
      alignChildren={"start"}
    >
      <Text color="white" text={"Redes sociales"}/>
      <Row>
        <Picture  
          style={{ cursor: "pointer", marginRight:20, marginTop:10, maxHeight:23 }} 
          onClick={openLink("https://www.facebook.com/groups/fiubaconsultas/")} 
          source={iconFacebook} 
          alt={"facebook"}            
        />
        <Picture  
          style={{ cursor: "pointer", marginRight:20, marginTop:10, maxHeight:23 }} 
          onClick={openLink("https://www.instagram.com/ingenieriauba/?hl=es-la")} 
          source={iconInstagram} 
          alt={"instagram"}            
        />
        <Picture  
          style={{ cursor: "pointer", marginRight:20, marginTop:10, maxHeight:23 }} 
          onClick={openLink("https://www.linkedin.com/in/graduados-fiuba/?originalSubdomain=ar")} 
          source={iconLinkedin} 
          alt={"linkedin"}            
        />
        <Picture  
          style={{ cursor: "pointer", marginRight:20, marginTop:10, maxHeight:23 }} 
          onClick={openLink("https://www.youtube.com/channel/UCWTyZXkzYAGYWvP1qc7U_dA")} 
          source={iconYoutube} 
          alt={"youtube"}            
        />
      </Row>
    </Col>
  )
}

const FooterLinkList = (
  props: { 
    title: string
    links: List<{
      name: string
      onClick: IO<void>
    }>
  }
) => {

  return(
    <Col
      margin={{bottom:30}}
    >
      <Text 
        text={props.title}
        color={"#444444"}
        margin={{bottom:12}}      
      />
      
      {props.links.map(({ onClick, name }, i) => 
        <Text
          key={i} 
          onClick={onClick}
          style={{ color: "white", cursor:"pointer" }} 
          text={name}
          margin={{bottom:10}} 
        />
      )}
    </Col>
  )
}