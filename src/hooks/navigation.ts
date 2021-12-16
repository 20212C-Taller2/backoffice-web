import { useMemo } from "react"
import { useHistory } from "react-router-dom"
import { IO } from "../utils/functional"

/* Add the necessary ptahs */
export const paths = {
  root: "/",
  home: "/home",
  addAdmin: "/addAdmin",
  courses: "/courses",
  users: "/users",
  userDetail: "/userDetail",
  courseDetail: "/courseDetail"
}

export const useNavigation = () => {

  const history = useHistory()

  return useMemo(() => {
        
    const push = (path: string): IO<void> => 
      () => { history.push(path) }

    const back: IO<void> = () => { history.goBack() }

    return {
      goTo: {
        root: push(paths.root),
        home: push(paths.home),
        addAdmin: push(paths.addAdmin),
        courses: push(paths.courses),
        users: push(paths.users),
        detail: {
          user: (id: string) => push(`${paths.userDetail}/${id}`),
          course: (id: string) => push(`${paths.courseDetail}/${id}`),
        }
      },
      back: back
    }
  }, [history])
}

export type Navigation = ReturnType<typeof useNavigation>
