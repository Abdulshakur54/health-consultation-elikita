import { useContext, useEffect } from "react"
import type { ReactNode } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate, useLocation } from "react-router-dom"
import Loading from "./Loading"
import { LocationContext } from "../contexts/LocationContext"

// Props for Auth wrapper
interface AuthProps {
  children: ReactNode
}

function Auth({ children }: AuthProps) {
  const authContext = useContext(AuthContext)
  const locationContext = useContext(LocationContext)
  const location = useLocation()

  // Ensure contexts are available
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider")
  }
  if (!locationContext) {
    throw new Error("LocationContext must be used within a LocationProvider")
  }

  const { authUser, loading } = authContext
  const { setAuthLastPage } = locationContext

  useEffect(() => {
    setAuthLastPage(location.pathname)
  }, [location.pathname, setAuthLastPage])

  if (loading) {
    return <Loading />
  }

  return authUser ? <div>{children}</div> : <Navigate to="/login" />
}

export default Auth
