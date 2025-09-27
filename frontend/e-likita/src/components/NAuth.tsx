import  { useContext } from "react"
import  type { ReactNode } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"
import { LocationContext } from "../contexts/LocationContext"
import Loading from "./Loading"

interface NAuthProps {
  children: ReactNode
}

function NAuth({ children }: NAuthProps) {
  const authContext = useContext(AuthContext)
  const locationContext = useContext(LocationContext)

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider")
  }
  if (!locationContext) {
    throw new Error("LocationContext must be used within a LocationProvider")
  }

  const { authUser, loading } = authContext
  const { authLastPage } = locationContext

  if (loading) {
    return <Loading />
  }

  return authUser ? <Navigate to={authLastPage} /> : <div>{children}</div>
}

export default NAuth
