import { useMemo } from "react"
import { useHistory } from "react-router-dom"
import { IO } from "../utils/functional"

/* Add the necessary ptahs */
export const paths = {
  home: "/home",
  login: "/login",
  addAdmin: "/agregarAdministrador"
}

export const useNavigation = () => {

  const history = useHistory()

  return useMemo(() => {
        
    const push = (path: string): IO<void> => 
      () => { history.push(path) }

    const back: IO<void> = () => { history.goBack() }

    return {
      goTo: {
        home: push(paths.home),
        login: push(paths.login),
        addAdmin: push(paths.addAdmin)
      },
      back: back
    }
  }, [history])
}

export type Navigation = ReturnType<typeof useNavigation>
