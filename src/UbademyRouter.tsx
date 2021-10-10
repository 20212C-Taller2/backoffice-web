import React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { MainLayout } from "./components/MainLayout"


export const UbademyRouter = () => {
  return (
    <Router>
        <MainLayout>
            <BackofficeRoutes/>
        </MainLayout>
    </Router>
  )
}

const BackofficeRoutes = () =>
  <>
    <Route exact path={["/"]} render={(props: any) => localStorage.getItem("token") ?
                    <Redirect to={"/home"}/> :
                    <Login {...props}/>
                }>
        {/*
            Administracion de usuarios (listar, ver perfil)
            Administrar cursos
            Ver estadisticas
            Perfil ?
        */}
    </Route>
    <Route exact path={"/home"} component={Home}/>
  </>
