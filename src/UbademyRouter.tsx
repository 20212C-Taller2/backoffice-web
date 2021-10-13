import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
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
            <Route exact path={["/", "/login"]}>
              <Login />
            </Route> :
            <Route path={"/home"}>
              <PrivateRoute />
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
