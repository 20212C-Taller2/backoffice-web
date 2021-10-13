import React from "react"
import Button from "@material-ui/core/Button"
import { makeStyles, Theme } from "@material-ui/core/styles"
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

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))


export const Login = () => {
  const classes = useStyles()

  const credentials = useStatefull(
    () => ({
      username: "",
      password: ""
    })
  )

  const showPassword = useStatefull<boolean>(() => false)

  const visitorUser = useVisitorUser()
  const login = useAsynchronous(visitorUser.actions.login)

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
          onKeyPressed={key => key === "Enter" ? nop : nop }
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
          onKeyPressed={key => key === "Enter" ? nop : nop }
          showPassword={showPassword}
        /> 
        {/*values.invalidCredentials && <Alert severity="error">Correo electrónico o contraseña incorrecta</Alert>*/}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={login.run({username: "", password: ""})}
        >
            Ingresar
        </Button>
      </Col>
    </Frame>
  )
}

