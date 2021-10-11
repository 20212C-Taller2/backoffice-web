import React from "react"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { PrivateRoute } from "./routes/PrivateRoute"


export const UbademyRouter = () => {
  return (
    <Router>
      <Route exact path={"/"} render={(props: any) => localStorage.getItem("token") ?
        <Redirect to={"/home"} /> :
        <Login {...props} />
      }>
        {/*
            Administracion de usuarios (listar, ver perfil)
            Administrar cursos
            Ver estadisticas
            Perfil ?
        */}
      </Route>
      <PrivateRoute exact path={"/home"} component={Home} />
    </Router>
  )
}
