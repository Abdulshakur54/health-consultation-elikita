import  { createContext, useState } from "react"
import  type { ReactNode, Dispatch, SetStateAction } from "react"

// Define the shape of the context value
interface LocationContextType {
  authLastPage: string
  setAuthLastPage: Dispatch<SetStateAction<string>>
}

// Define props for the provider
interface LocationProviderProps {
  children: ReactNode
}

// Create context with default undefined (so we can type check in a hook)
export const LocationContext = createContext<LocationContextType | undefined>(undefined)

function LocationProvider({ children }: LocationProviderProps) {
  const [authLastPage, setAuthLastPage] = useState<string>("/portal")

  return (
    <LocationContext.Provider value={{ authLastPage, setAuthLastPage }}>
      {children}
    </LocationContext.Provider>
  )
}

export default LocationProvider
