import React from "react"
import { render } from "react-dom"
import { UbademyBackofficeApp } from "./App"
import "regenerator-runtime"
import { QueryClient, QueryClientProvider } from "react-query"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 1 * 1000, // 1 second
    }
  },
})

render(
  <QueryClientProvider client={queryClient}>
    <UbademyBackofficeApp/>
  </QueryClientProvider>, 
  document.getElementById("react-target")
)


