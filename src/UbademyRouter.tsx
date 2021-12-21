import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Login } from "./pages/LoginPage"
import { MainLayout } from "./components/MainLayout"
import { paths } from "./hooks/navigation"
import { AddAdministratorPage } from "./pages/AddAdministratorPage"
import { UdemyUser } from "./user/user"
import { Home } from "./pages/Home"
import { UsersPage } from "./pages/UsersPage"
import { UserDetailPage } from "./pages/UserDetailPage"
import { CoursesPage } from "./pages/CoursesPage"
import { CourseDetailPage } from "./pages/CourseDetailPage"
import { MetricsPage } from "./pages/MetricsPage"


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
        }
      </MainLayout>
    </Router>
  )
}

const VisitorRoutes = () => {

  return(
    <Route exact path={["/"]}>
      <Login />
    </Route>
  ) 
}


const AdminRoutes = () => {

  return(
    <>
      <Route exact path={["/", paths.home]}>
        <Home />
      </Route>
      <Route path={paths.addAdmin}>
        <AddAdministratorPage />
      </Route>
      <Route path={paths.courses}>
        <CoursesPage />
      </Route>
      <Route path={paths.users}>
        <UsersPage />
      </Route>
      <Route path={paths.userDetail}>
        <UserDetailPage />
      </Route>
      <Route path={paths.courseDetail}>
        <CourseDetailPage />
      </Route>
      <Route path={paths.metricsPage}>
        <MetricsPage />
      </Route>
    </>
  ) 
}