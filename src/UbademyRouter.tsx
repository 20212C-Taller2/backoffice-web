import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { MainLayout } from "./components/MainLayout"


export const UbademyRouter = () =>  {

  
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
    <Route exact path={["/"]}>
        {/* 
            Administracion de usuarios (listar, ver perfil)
            Administrar cursos 
            Ver estadisticas
            Perfil ?
        */}
    </Route>
  </>


