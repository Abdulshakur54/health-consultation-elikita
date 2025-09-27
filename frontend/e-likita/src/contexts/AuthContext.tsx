import { createContext, useEffect, useState } from "react"
import type { ReactNode, Dispatch, SetStateAction} from "react"

import axios from "axios"
import type { AxiosInstance } from "axios"
import { toast } from "../lib/utils"

// Types
interface User {
  _id: string
  name: string
  email: string
  fullName: string,
  dob: string,
  password: string,
  medicalHistory: string[],
  gender: string
  profilePic: string,
  profilePicId: string
}


interface AuthContextType {
  api: AxiosInstance
  authUser: User | null
  setAuthUser: Dispatch<SetStateAction<User | null>>
  setToken: Dispatch<SetStateAction<string | null>>
  logout: () => void
  loading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

// Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const backendUrl = import.meta.env.VITE_BACKEND_URL as string

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const api: AxiosInstance = axios.create({
    baseURL: backendUrl,
    timeout: 20000,
  })

  api.interceptors.request.use((config) => {
    const freshToken = localStorage.getItem("token") // always read fresh
    if (freshToken && config.headers) {
      config.headers.Authorization = `Bearer ${freshToken}`
    }
    return config
  })

  // function to fetch authenticated user
  const getUser = async (): Promise<User | null> => {
    try {
      const res = await api.get<{ data: { user: User } }>("/api/v1/users/user")
      if (res.status === 200) {
        return res.data.data.user
      }
      return null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const checkAuth = async () => {
    if (token) {
      const user = await getUser()
      if (user) {
        setAuthUser(user)
      }
    } else {
      setAuthUser(null)
    }
    setLoading(false)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    toast.success("Logged out successfully")
  }

  const cleanUp = () => {
    setLoading(true)
  }

  useEffect(() => {
    checkAuth()
    return cleanUp
  }, [token])

  const value: AuthContextType = {
    api,
    authUser,
    setAuthUser,
    setToken,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
