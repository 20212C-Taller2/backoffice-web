import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Login } from "./pages/LoginPage"
import { MainLayout } from "./components/MainLayout"
import { paths } from "./hooks/navigation"
import { AddAdministratorPage } from "./pages/AddAdministratorPage"
import { UdemyUser } from "./user/user"
import { Home } from "./pages/Home"
import { UsersPage } from "./pages/UsersPage"


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
            <VisitorRoutes/> :
            <AdminRoutes/>
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

const VisitorRoutes = () => {

  return(
    <Route exact path={["/", paths.login]}>
      <Login />
    </Route>
  ) 
}


const AdminRoutes = () => {

  return(
    <>
      <Route path={paths.home}>
        <Home />
      </Route>
      <Route path={paths.addAdmin}>
        <AddAdministratorPage />
      </Route>
      <Route path={paths.users}>
        <UsersPage />
      </Route>
    </>
  ) 
}