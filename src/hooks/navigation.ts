import { useMemo } from "react"
import { useHistory } from "react-router-dom"
import { IO } from "../utils/functional"

/* Add the necessary ptahs */
export const paths = {
  root: "/",
  home: "/home",
  addAdmin: "/addAdmin",
  users: "/users",
  userDetail: "/userDetail"
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
        users: push(paths.users),
        detail: {
          user: (id: string) => push(`${paths.userDetail}/${id}`)
        }
      },
      back: back
    }
  }, [history])
}

export type Navigation = ReturnType<typeof useNavigation>
