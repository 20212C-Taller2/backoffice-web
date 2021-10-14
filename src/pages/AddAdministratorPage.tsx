/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useEffect } from "react"
import { useAdminUser } from "../hooks/context"
import { Col, Row } from "../primitives/Flexbox"
import { Loading } from "../primitives/Loading"
import { StringEditor } from "../primitives/StringEditor"
import { Text } from "../primitives/Text"
import { Window } from "../primitives/Window"
import { useAsynchronous } from "../utils/asynchronism"
import { nop } from "../utils/functional"
import { applyLens, lens, setTo, useStatefull } from "../utils/state"
import { isEmail, isValidName, isValidPassword } from "../utils/validation"


export const AddAdministratorPage = () => {

  const adminUser = useAdminUser()
  
  const showPassword = useStatefull(() => false)
  const showRegistrySuccessWindow = useStatefull(() => false)

  const newAdminFields = useStatefull(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
  )

  const registerAsync = useAsynchronous(adminUser.actions.registerAdmin)
  const runRegisterAsync = registerAsync.run({
    firstName: newAdminFields.value.firstName,
    lastName: newAdminFields.value.lastName,
    email: newAdminFields.value.email,
    password: newAdminFields.value.password
  })
  const disableRegistry = 
    !isValidName(newAdminFields.value.firstName) ||
    !isValidName(newAdminFields.value.lastName) ||
    newAdminFields.value.email === "" ||
    newAdminFields.value.password === "" ||
    (newAdminFields.value.password !== newAdminFields.value.confirmPassword) || 
    !isValidPassword(newAdminFields.value.password) ||
    !isEmail(newAdminFields.value.email)

  useEffect( 
    registerAsync.status === "completed" ? 
      setTo(showRegistrySuccessWindow, true) :
      nop,
    [registerAsync.status]    
  )

  return (
    <Col
      fill
      padding={40}
    >
      <Text 
        fontSize={25}
        bold
        color={"#444444"}
        text={"Agregar administrador"}
        margin={{bottom:10}}
        padding={5}
        style={{borderBottom: "2px solid lightgray"}}
      />

      <Text 
        text={"• La contraseña deberá contener al menos 8 caracteres de largo, 1 mayúscula y 1 número"}
        color="#444444"
        fontSize={16}
        margin={{top: 20}}
        bold
      />
      <Col
        padding={30}
        alignChildren={"center"}
        width="100%"
      >
        <Col
          width={"75%"}
          alignChildren={"center"}
        >
          <Row
            fillWidth
            alignChildren="center"
            justifyChildren="center"
          >
            <Col
              fillWidth
            >
              <StringEditor 
                style={{  margin: 20 }}
                label={"Nombre"}
                key={"firstName"}
                placeholder={"Ingresar nombre"}
                type="normal"
                showErrors={false}
                state={applyLens(newAdminFields, lens("firstName"))}
                onKeyPressed={key => key === "Enter" ? nop : nop }
              /> 
              <StringEditor 
                style={{ margin: 20 }}
                label={"Apellido"}
                key={"lastName"}
                placeholder={"Ingresar apellido"}
                type="normal"
                showErrors={false}
                state={applyLens(newAdminFields, lens("lastName"))}
                onKeyPressed={key => key === "Enter" ? nop : nop }
              /> 
            </Col>
            <Col
              fillWidth
            >
              <StringEditor 
                style={{ margin: 20 }}
                label={"Contraseña"}
                key={"Password"}
                placeholder={"Ingresar contraseña"}
                type="password"
                showErrors={false}
                state={applyLens(newAdminFields, lens("password"))}
                onKeyPressed={key => key === "Enter" ? nop : nop }
                showPassword={showPassword}
              /> 
              <StringEditor 
                style={{  margin: 20 }}
                label={"Repetir contraseña"}
                key={"Password"}
                placeholder={"Ingresar contraseña"}
                type="password"
                showErrors={false}
                state={applyLens(newAdminFields, lens("confirmPassword"))}
                onKeyPressed={key => key === "Enter" ? nop : nop }
                showPassword={showPassword}
              /> 
            </Col>
          </Row>
          <StringEditor 
            style={{ width:"50%", margin: 20 }}
            label={"Email"}
            key={"Email"}
            placeholder={"Ingresar email"}
            type="email"
            showErrors={false}
            state={applyLens(newAdminFields, lens("email"))}
            onKeyPressed={key => key === "Enter" ? nop : nop }
          /> 
          {
            registerAsync.status === "failed" ? 
              <Alert style={{marginTop: 15}} severity="error">Hubo un error, intentelo nuevamente</Alert> : 
              null
          }
          <Button
            color="primary"
            type="submit"
            style={{width: "50%", marginTop: 70}}
            variant="contained"
            onClick={runRegisterAsync}
            disabled={disableRegistry}
          >
            {
              registerAsync.status === "running" ?
                <Loading style={{ width: 25, height: 25, marginRight: 15, color: "white" }}/> 
                : null 
            }
            <Text text={"Registrar administrador"}/>  
          </Button>
        </Col>
      </Col>
      <Window
        open={showRegistrySuccessWindow}
      >
        <Col 
          width={700} 
          //alignChildren="center" 
          margin={{ left: 20 }} 
          padding={20}
        >

          <Text
            text="Se ha registrado con éxito el usuario"
            margin={{ bottom: 20 }}
            fontSize={25}
            style={{borderBottom: "2px solid lightgray"}}
          />
          <Text
            text={`${"Nombre:"} ${newAdminFields.value.firstName}`}
            margin={7}
            fontSize={17}
          />
          <Text
            text={`${"Apellido:"} ${newAdminFields.value.lastName}`}
            margin={7}
            fontSize={17}

          />
          <Text
            text={`${"Email:"} ${newAdminFields.value.email}`}
            margin={7}
            fontSize={17}

          />
          <Button
            color="primary"
            type="submit"
            style={{width: "50%", marginTop: 50, alignSelf: "center"}}
            variant="contained"
            onClick={setTo(showRegistrySuccessWindow, false)}
          >
            Aceptar
          </Button>


        </Col>
      </Window>
    </Col>
  )
}
