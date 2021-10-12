import React from "react"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { MainLayout } from "./components/MainLayout"
import { PrivateRoute } from "./routes/PrivateRoute"
import { UdemyUser } from "./user/user"


export const UbademyRouter = (
  props: {
    user: UdemyUser
  }
) => {
  return (
    <Router>
      <MainLayout>
        {
          props.user.type === "visitor"?
            <Route exact path={"/"}>
              <Login />
            </Route> :
            <Route path={"/home"}>
              <PrivateRoute exact path={"/home"} component={Home} />
            </Route>
        
          /*
            Administracion de usuarios (listar, ver perfil)
            Administrar cursos
            Ver estadisticas
            Perfil ?
        */
        
      
        }
      </MainLayout>
    </Router>
  )
}
