import React from "react"
import Button from "@material-ui/core/Button"
import Lock from "@material-ui/icons/Lock"
import Person from "@material-ui/icons/Person"
import iconUbademy from "../../res/images/ubademy.svg"
import { Col } from "../primitives/Flexbox"
import { Picture } from "../primitives/Picture"
import { StringEditor } from "../primitives/StringEditor"
import { Text } from "../primitives/Text"
import { nop } from "../utils/functional"
import { applyLens, lens, useStatefull } from "../utils/state"
import { Frame } from "../primitives/Frame"
import { useVisitorUser } from "../hooks/context"
import { useAsynchronous } from "../utils/asynchronism"
import { Loading } from "../primitives/Loading"
import { Alert } from "@material-ui/lab"


export const Login = () => {

  const credentials = useStatefull(
    () => ({
      username: "",
      password: ""
    })
  )

  const showPassword = useStatefull<boolean>(() => false)

  const visitorUser = useVisitorUser()
  const login = useAsynchronous(visitorUser.actions.login)
  const runLogin = login.run({username: credentials.value.username, password: credentials.value.password})

  return (
    <Frame
      centerHorizontal
      width={"30%"}
      padding={40}
    >
      <Col
        alignChildren="center"
      >
        <Picture source={iconUbademy} />
        <Text text={"Ubademy"} fontSize={25} />
        <StringEditor 
          style={{ width: "100%", marginTop: 30, marginBottom:30 }}
          prefix={<Person style={{ margin: 4, color: "#666666" } } />}
          label={"Correo Electrónico"}
          key={"Usuario"}
          placeholder={"Ingresar usuario"}
          type="email"
          state={applyLens(credentials, lens("username"))}
          showErrors={false}
          errorList={["Usuario o contraseña incorrecta"]}
          onKeyPressed={key => key === "Enter" ? runLogin : nop }
        />
        <StringEditor 
          style={{ width: "100%" }}
          prefix={<Lock style={{ margin: 4, color: "#666666"} } />}
          label={"Contraseña"}
          key={"Password"}
          placeholder={"Ingresar contraseña"}
          type="password"
          showErrors={false}
          state={applyLens(credentials, lens("password"))}
          onKeyPressed={key => key === "Enter" ? runLogin : nop }
          showPassword={showPassword}
        /> 
        {
          login.status === "failed" ? 
            <Alert style={{marginTop: 15}} severity="error">Correo electrónico o contraseña incorrecta</Alert> : 
            null
        }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{marginTop: 30}}
          onClick={runLogin}
        >
          {
            login.status === "running" ?
              <Loading style={{ width: 25, height: 25, marginRight: 15, color: "white" }}/> 
              : null 
          }
            Ingresar
        </Button>
      </Col>
    </Frame>
  )
}

